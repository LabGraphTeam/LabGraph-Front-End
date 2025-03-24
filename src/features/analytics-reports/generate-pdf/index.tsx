import {
  formatDateWithTime,
  formatEndDateWithTime
} from '@/features/shared/ui/date-selectors/constants/formatDateWithTime'
import { PdfGeneratorProps } from '@/types/PDFGenerator'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { FileText, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import getStatusMessage from '../../shared/utils/helpers/getStatusMessage'
import useReportsData from '../hooks/useReportsData'

interface TestData {
  name?: string
  NAME?: string
  rules?: string
  RULES?: string
  [key: string]: string | number | undefined
}

const GeneratePdf: React.FC<PdfGeneratorProps> = ({
  analyticsType,
  fileName = 'data.pdf',
  reportMonth,
  reportYear,
  startDate,
  endDate
}) => {
  const [isGenerating, setIsGenerating] = useState(false)

  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/${
    process.env.NEXT_PUBLIC_API_BASE_URL_REPORTS
  }startDate=${formatDateWithTime(startDate.year, startDate.month, startDate.day)}&endDate=${formatEndDateWithTime(
    endDate.year,
    endDate.month,
    endDate.day
  )}&pageSize=2500&sort=date,asc`

  const { dataFetched: jsonData } = useReportsData({ url })

  // Helper function to format only decimal numbers
  const formatValue = (value: number | string | null | undefined): number | string => {
    if (value === null || value === undefined) {
      return ''
    }

    if (typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)))) {
      const numValue = Number(value)
      // Only format numbers that have decimal places
      if (numValue % 1 !== 0) {
        return numValue.toFixed(2)
      }
      return numValue
    }
    return value
  }

  // Function to format rule status appropriately
  const formatRuleValue = (header: string, value: any): any => {
    const upperHeader = header.toUpperCase()

    // Check if this is a rule column
    if (upperHeader === 'RULES' || upperHeader === 'RULE') {
      // If no rule violation (empty, None, or "No rule broken")
      if (!value || value === 'None' || value === '' || value === 'No rule broken') {
        return 'Average'
      }
    }

    return formatValue(value)
  }

  // Column header mapping for better description
  const columnMapping: Record<string, string> = {
    DATE: 'Date of Analysis',
    LEVEL_LOT: 'Control Level Lot',
    TEST_LOT: 'Test Lot Number',
    NAME: 'Test Name',
    LEVEL: 'Control Level',
    VALUE: 'Measured Value',
    MEAN: 'Mean Value',
    SD: 'Standard Deviation',
    UNIT_VALUE: 'Unit of Measurement',
    RULES: 'Quality Rules',
    DESCRIPTION: 'Test Description',
    VALIDATOR_USER: 'Validator User'
  }

  // Function to map column headers to descriptive labels
  const getDescriptiveHeader = (header: string): string => {
    const upperHeader = header.toUpperCase()
    return columnMapping[upperHeader] || upperHeader
  }

  // Function to check if a rule is a severe violation (+3s or -3s)
  const isSevereViolation = (rule: string | null | undefined): boolean => {
    if (rule === null || rule === undefined) return false

    // Convert to string and trim in case it's not a string
    const ruleStr = String(rule).trim()

    // Check if rule is +3s or -3s
    return ruleStr === '+3s' || ruleStr === '-3s'
  }

  // Function to determine rule violation type
  const getRuleViolationType = (rule: string): 'severe' | 'warning' | 'minor' | 'none' => {
    if (rule === null || rule === undefined) return 'none'

    // Convert to string and trim
    const ruleStr = String(rule).trim()

    if (ruleStr === '+3s' || ruleStr === '-3s') {
      return 'severe'
    } else if (ruleStr === '+2s' || ruleStr === '-2s') {
      return 'warning'
    } else if (ruleStr === '+1s' || ruleStr === '-1s') {
      return 'minor'
    } else if (ruleStr === 'Average') {
      return 'none'
    }

    // For any other rule that doesn't match the patterns
    return 'minor'
  }

  // Function to calculate basic statistics from data
  const calculateStatistics = (data: any[]) => {
    const stats: Record<string, any> = {}

    if (!data || data.length === 0) return stats

    // Count number of tests
    stats.totalTests = data.length

    // Count unique test names if available
    if (data[0].name || data[0].NAME) {
      const nameKey = data[0].name ? 'name' : 'NAME'
      const uniqueTests = new Set(data.map((item) => item[nameKey]))
      stats.uniqueTests = uniqueTests.size
    }

    // Check for rules violations if the field exists
    if (data[0].rules || data[0].RULES) {
      const rulesKey = data[0].rules ? 'rules' : 'RULES'

      // Only count violations that are +3s or -3s
      const violations = data.filter((item) => isSevereViolation(item[rulesKey]))

      stats.violations = violations.length
      stats.violationPercentage = ((violations.length / data.length) * 100).toFixed(1)
    }

    return stats
  }

  // Function to get problematic tests ranked by violation count

  const getProblematicTests = (data: any[], maxCount = 5) => {
    if (!data || data.length === 0) return []

    // Check if we have name and rules columns
    const hasName = data[0].name || data[0].NAME
    const hasRules = data[0].rules || data[0].RULES

    if (!hasName || !hasRules) return []

    const nameKey = data[0].name ? 'name' : 'NAME'
    const rulesKey = data[0].rules ? 'rules' : 'RULES'

    // Group by test name and count violations
    const testViolations: Record<
      string,
      { name: string; severe: number; warning: number; total: number }
    > = {}

    data.forEach((item) => {
      const testName = String(item[nameKey])
      const rule = item[rulesKey]

      // Initialize if first time seeing this test
      if (!testViolations[testName]) {
        testViolations[testName] = {
          name: testName,
          severe: 0,
          warning: 0,
          total: 0
        }
      }

      // Check rule type and increment counters
      const ruleStr = rule ? String(rule).trim() : ''
      if (ruleStr === '+3s' || ruleStr === '-3s') {
        testViolations[testName].severe += 1
        testViolations[testName].total += 1
      } else if (ruleStr === '+2s' || ruleStr === '-2s') {
        testViolations[testName].warning += 1
        testViolations[testName].total += 1
      }
    })

    // Convert to array and sort by total violations
    const sortedTests = Object.values(testViolations)
      .filter((test) => test.total > 0)
      .sort((a, b) => b.total - a.total)
      .slice(0, maxCount)

    return sortedTests
  }

  // Add footer with page numbers
  const addFooter = (doc: jsPDF) => {
    const pageCount = doc.internal.getNumberOfPages()

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)

      // Footer line
      doc.setDrawColor(75, 107, 175)
      doc.setLineWidth(0.5)
      doc.line(
        10,
        doc.internal.pageSize.height - 10,
        doc.internal.pageSize.width - 10,
        doc.internal.pageSize.height - 10
      )

      // Page number
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 5,
        { align: 'center' }
      )

      // Company info in footer
      doc.setFontSize(8)
      doc.text('Lab Spec Analytics', 10, doc.internal.pageSize.height - 5)

      // Date in footer right
      doc.text(
        new Date().toLocaleDateString(),
        doc.internal.pageSize.width - 10,
        doc.internal.pageSize.height - 5,
        { align: 'right' }
      )
    }
  }

  // Function to enhance title with analyzer information based on department
  const enhanceReportTitle = (title: string): string => {
    const uppercaseTitle = title.toUpperCase()

    if (uppercaseTitle.includes('BIOCHEMISTRY')) {
      return uppercaseTitle.replace('BIOCHEMISTRY', 'BIOCHEMISTRY(Cobas Integra - 400)')
    } else if (uppercaseTitle.includes('HEMATOLOGY')) {
      return uppercaseTitle.replace('HEMATOLOGY', 'HEMATOLOGY(BC-6000)')
    } else if (uppercaseTitle.includes('COAGULATION')) {
      return uppercaseTitle.replace('COAGULATION', 'COAGULATION(ACL-TOP 350 cts)')
    }

    return uppercaseTitle
  }

  const generatePdf = () => {
    if (isGenerating) return
    if (!jsonData) return
    setIsGenerating(true)

    try {
      // Create PDF with better quality settings
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })

      // Add document metadata
      doc.setProperties({
        title: fileName.replace('.pdf', ''),
        subject: `Quality Lab Analytics Report for ${reportMonth || new Date().toLocaleString('default', { month: 'long' })} ${reportYear || new Date().getFullYear()}`,
        author: 'Quality Lab Pro System',
        creator: 'Quality Lab Pro',
        keywords: 'analytics, quality control, lab data'
      })

      // Get month and year for the title (use provided values or current date)
      const month =
        reportMonth?.toLocaleUpperCase() ??
        new Date().toLocaleString('default', { month: 'long' }).toUpperCase()
      const year = reportYear?.toString().toLocaleUpperCase() ?? new Date().getFullYear()

      // Create basic report title
      const basicReportTitle = fileName
        .replace(/-/g, ' ')
        .replace('.pdf', '')
        .replace('analytics', '')
        .toUpperCase()

      // Enhance the title with analyzer information
      const reportTitle = enhanceReportTitle(basicReportTitle)

      const currentDate = new Date().toLocaleDateString()

      // Add header with gradient effect (reduced in height)
      doc.setFillColor(42, 73, 128) // Dark blue header
      doc.rect(0, 0, 297, 20, 'F') // Reduced from 25 to 20
      doc.setFillColor(75, 107, 175) // Lighter blue accent
      doc.rect(0, 18, 297, 2, 'F') // Adjusted

      // Reserved space for logo (could be implemented later)
      doc.setDrawColor(255, 255, 255)
      doc.setLineWidth(0.1)
      doc.rect(10, 3, 12, 12) // Reduced size

      // Add title with better formatting
      doc.setFontSize(14) // Reduced from 16 to 14 to accommodate longer titles
      doc.setTextColor(255, 255, 255) // White text
      doc.setFont('helvetica', 'bold')
      doc.text(`${reportTitle}`, 27, 9) // Adjusted Y from 12 to 9

      // Add date information with improved styling
      doc.setFontSize(8) // Reduced from 10 to 9
      doc.text(`Report Period: ${month} ${year}`, 27, 15) // Adjusted Y from 19 to 15

      // Add generation date on the right
      doc.text(`Generated: ${currentDate}`, 240, 8, { align: 'right' })

      // Current vertical position tracker - start closer to the top
      let yPosition = 25 // Reduced from 35 to 25

      // Add summary section if data exists
      if (
        typeof jsonData === 'object' &&
        'content' in jsonData &&
        Array.isArray(jsonData.content) &&
        jsonData.content.length > 0
      ) {
        // Calculate statistics
        const stats = calculateStatistics(jsonData.content)

        // Add summary box (more compact)
        doc.setDrawColor(75, 107, 175)
        doc.setLineWidth(0.5)
        doc.setFillColor(240, 245, 255)
        doc.roundedRect(10, yPosition, 277, 15, 3, 3, 'FD') // Reduced height from 20 to 15

        // Add summary title
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11) // Reduced from 12 to 11
        doc.setTextColor(42, 73, 128)
        doc.text('REPORT SUMMARY', 15, yPosition + 6) // Adjusted Y and X

        // Add summary content
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8) // Reduced from 10 to 9
        doc.setTextColor(60, 60, 60)

        let summaryX = 15 // Reduced from 20 to 15
        doc.text(`Total Records: ${stats.totalTests || 'N/A'}`, summaryX, yPosition + 11)

        if (stats.uniqueTests) {
          summaryX += 50
          doc.text(`Available Analytes: ${stats.uniqueTests}`, summaryX, yPosition + 11)
        }

        if (stats.violations !== undefined) {
          summaryX += 50
          doc.text(
            `Total of violations ±3s: ${stats.violations} (${stats.violationPercentage}%)`,
            summaryX,
            yPosition + 11
          )
        }

        // Update position after summary - less spacing
        yPosition += 20 // Reduced from 35 to 20

        // Add problematic tests section (if necessary - more compact)
        const problematicTests = getProblematicTests(jsonData.content)

        if (problematicTests.length > 0) {
          // Calculate height with less spacing
          const rowHeight = 5 // Reduced from 6 to 5
          const headerHeight = 12 // Reduced from 15 to 12
          const marginTop = 3 // Reduced from 5 to 3
          const marginBottom = 5 // Reduced from 8 to 5
          const totalHeight =
            headerHeight + problematicTests.length * rowHeight + marginTop + marginBottom

          // Add problematic tests header with less spacing
          doc.setDrawColor(75, 107, 175)
          doc.setLineWidth(0.5)
          doc.setFillColor(240, 245, 255)
          doc.roundedRect(10, yPosition, 277, totalHeight, 3, 3, 'FD')

          // Add title
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(11) // Reduced from 12 to 11
          doc.setTextColor(42, 73, 128)
          doc.text('PROBLEMATIC TESTS', 15, yPosition + 6) // Adjusted from 20 to 15

          // Add column headers with less spacing
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(6) // Reduced from 9 to 8
          doc.setTextColor(60, 60, 60)
          const headerY = yPosition + marginTop + 8 // Reduced from 10 to 8

          // Draw header line
          doc.setDrawColor(200, 200, 200)
          doc.setLineWidth(0.2)
          doc.line(15, headerY + 2, 280, headerY + 2)

          // Column headers with adjusted positioning
          doc.text('Test Name', 15, headerY)
          doc.text('±3s Count', 180, headerY)
          doc.text('±2s Count', 220, headerY)
          doc.text('Total Issues', 260, headerY)

          // List problematic tests
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(8) // Reduced from 9 to 8

          problematicTests.forEach((test, index) => {
            const testY = headerY + 6 + index * rowHeight // Reduced from 8 to 6

            // Truncate long test names
            let testName = test.name
            if (testName.length > 45) {
              testName = testName.substring(0, 42) + '...'
            }

            doc.text(testName, 15, testY)

            // Use different colors based on severity
            if (test.severe > 0) {
              doc.setTextColor(180, 0, 0)
            } else {
              doc.setTextColor(60, 60, 60)
            }
            doc.text(test.severe.toString(), 180, testY, { align: 'center' })

            if (test.warning > 0) {
              doc.setTextColor(160, 130, 0)
            } else {
              doc.setTextColor(60, 60, 60)
            }
            doc.text(test.warning.toString(), 220, testY, { align: 'center' })

            doc.setTextColor(42, 73, 128)
            doc.text(test.total.toString(), 260, testY, { align: 'center' })
          })

          // Reset text color
          doc.setTextColor(60, 60, 60)

          // Update position after problematic tests - less spacing
          yPosition += totalHeight + 5 // Reduced from 10 to 5
        }

        if (jsonData.content.length > 0) {
          // Use section title for the data table (more compact)
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(9) // Reduced from 12 to 11
          doc.setTextColor(42, 73, 128)
          doc.text('ANALYTICS ', 10, yPosition)

          yPosition += 7 // Reduced from 10 to 7

          // Extract headers from first object
          const firstItem = jsonData.content[0]
          const headers = Object.keys(firstItem).filter((key) => key !== 'id' && key !== 'Id')

          // Use the mapping to get more descriptive headers
          const formattedHeaders = headers.map((header) => getDescriptiveHeader(header))

          // Extract rows - excluding Id column and format values, replacing "No rule broken" with "Average"
          const data = jsonData.content.map((item: { [x: string]: any }) =>
            headers.map((header) => formatRuleValue(header, item[header]))
          )

          // Different configurations for the first page and subsequent pages
          let firstPageDone = false
          let firstPageRowCount = 0
          const rowsPerPage = {
            firstPage: 5, // Reduced from 8 to 7
            subsequentPages: 14 // Reduced from 15 to 14
          }

          // Use autoTable with improved styling and optimized for more rows per page
          autoTable(doc, {
            head: [formattedHeaders],
            body: data,
            startY: yPosition,
            theme: 'grid',
            headStyles: {
              fillColor: [75, 107, 175],
              textColor: [255, 255, 255],
              fontStyle: 'bold',
              halign: 'center',
              fontSize: 7,
              cellPadding: 2
            },
            alternateRowStyles: {
              fillColor: [245, 248, 252]
            },
            bodyStyles: {
              fontSize: 7,
              lineWidth: 0.1,
              lineColor: [200, 200, 200],
              cellPadding: 1.5
            },
            // Manage the number of rows on each page
            didDrawPage: function (data) {
              // After drawing the first page, update the configuration for subsequent pages
              if (!firstPageDone) {
                firstPageDone = true
                firstPageRowCount = 0 // Reset counter when changing page

                // On the next page, adjust the space to accommodate more rows
                data.settings.margin.top = 20 // Reduce top margin on subsequent pages
              }
            },

            // New strategy to control rows per page
            willDrawCell: function (data) {
              // Only affects body cells (not header) and only on the first page
              if (data.section === 'body' && data.pageNumber === 0 && !firstPageDone) {
                // If the index of the current row is different from the previous one, we're on a new row
                if (data.row.index >= 0 && data.column.index === 0) {
                  firstPageRowCount++
                }

                // If we have reached the row limit and are about to draw one more
                if (firstPageRowCount > rowsPerPage.firstPage && data.cursor) {
                  // Force page break by moving the cursor to the end of the page
                  data.cursor.y = doc.internal.pageSize.height
                }
              }
            },

            // Highlight rows with rule violations if applicable
            didParseCell: function (data) {
              const rulesCol = headers.findIndex(
                (h) => h.toUpperCase() === 'RULES' || h.toUpperCase() === 'RULE'
              )

              if (rulesCol >= 0 && data.row.index >= 0 && data.section === 'body') {
                const cellValue = data.cell.raw

                if (data.column.index === rulesCol) {
                  const violationType = getRuleViolationType(cellValue?.toString() ?? '')

                  switch (violationType) {
                    case 'severe':
                      // +3s or -3s: Red (high severity)
                      data.cell.styles.fillColor = [255, 240, 240]
                      data.cell.styles.textColor = [180, 0, 0]
                      data.cell.styles.fontStyle = 'bold'
                      break

                    case 'warning':
                      // +2s or -2s: Yellow (warning)
                      data.cell.styles.fillColor = [255, 252, 220]
                      data.cell.styles.textColor = [160, 130, 0]
                      data.cell.styles.fontStyle = 'normal'
                      break

                    case 'minor':
                      // +1s or -1s: Light green (minor issue)
                      data.cell.styles.textColor = [0, 150, 50]
                      data.cell.styles.fontStyle = 'normal'
                      break

                    case 'none':
                      // Average: Green
                      data.cell.styles.textColor = [0, 120, 0]
                      data.cell.styles.fontStyle = 'normal'
                      break
                  }
                }
              }
            },
            styles: {
              overflow: 'linebreak',
              font: 'helvetica',
              lineColor: [75, 107, 175],
              lineWidth: 0.1,
              minCellHeight: 6,
              cellWidth: 'auto' // Auto width adjustment for better space distribution
            },
            margin: { top: yPosition, right: 10, bottom: 15, left: 10 }
          })
        }
      }

      // Add footer with page numbers
      addFooter(doc)

      // Save the PDF with month and year in filename
      const formattedFileName = `${month}_${year}_${reportTitle.toLowerCase().replace(/\s+/g, '_')}`
      doc.save(formattedFileName.endsWith('.pdf') ? formattedFileName : `${formattedFileName}.pdf`)
    } catch (error: unknown) {
      console.log(error)
      if (error instanceof Error) {
        alert('Error generating PDF: ' + getStatusMessage((error as any).status))
      }
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={generatePdf}
      disabled={isGenerating}
      className={`flex items-center justify-center rounded-md border border-borderColor p-1 text-center text-sm text-textSecondary shadow-sm shadow-shadow hover:scale-105`}
      aria-label='Export PDF'
    >
      {isGenerating ? (
        <Loader2 className='mr-1 size-4 animate-spin' />
      ) : (
        <FileText className='mr-1 size-4' />
      )}
      <span>Generate Report</span>
    </button>
  )
}

export default GeneratePdf
