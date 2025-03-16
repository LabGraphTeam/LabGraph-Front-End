import { PdfGeneratorProps } from '@/types/PDFGenerator'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { FileText, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import getStatusMessage from '../../shared/utils/helpers/getStatusMessage'

const GeneratePdf: React.FC<PdfGeneratorProps> = ({
  jsonData,
  fileName = 'data.pdf',
  reportMonth,
  reportYear
}) => {
  const [isGenerating, setIsGenerating] = useState(false)

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
    DESCRIPTION: 'Test Description'
  }

  // Function to map column headers to descriptive labels
  const getDescriptiveHeader = (header: string): string => {
    const upperHeader = header.toUpperCase()
    return columnMapping[upperHeader] || upperHeader
  }

  // Function to check if a rule is a severe violation (+3s or -3s)
  const isSevereViolation = (rule: any): boolean => {
    if (rule === null || rule === undefined) return false

    // Convert to string and trim in case it's not a string
    const ruleStr = String(rule).trim()

    // Check if rule is +3s or -3s
    return ruleStr === '+3s' || ruleStr === '-3s'
  }

  // Function to determine rule violation type
  const getRuleViolationType = (rule: any): 'severe' | 'warning' | 'minor' | 'none' => {
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
      let basicReportTitle = fileName
        .replace(/-/g, ' ')
        .replace('.pdf', '')
        .replace('analytics', '')
        .toUpperCase()

      // Enhance the title with analyzer information
      const reportTitle = enhanceReportTitle(basicReportTitle)

      const currentDate = new Date().toLocaleDateString()

      // Add header with gradient effect (reduzido em altura)
      doc.setFillColor(42, 73, 128) // Dark blue header
      doc.rect(0, 0, 297, 20, 'F') // Reduzido de 25 para 20
      doc.setFillColor(75, 107, 175) // Lighter blue accent
      doc.rect(0, 18, 297, 2, 'F') // Ajustado

      // Reserved space for logo (could be implemented later)
      doc.setDrawColor(255, 255, 255)
      doc.setLineWidth(0.1)
      doc.rect(10, 3, 12, 12) // Tamanho reduzido

      // Add title with better formatting
      doc.setFontSize(14) // Reduced from 16 to 14 to accommodate longer titles
      doc.setTextColor(255, 255, 255) // White text
      doc.setFont('helvetica', 'bold')
      doc.text(`${reportTitle}`, 27, 9) // Ajustado Y de 12 para 9

      // Add date information with improved styling
      doc.setFontSize(8) // Reduzido de 10 para 9
      doc.text(`Report Period: ${month} ${year}`, 27, 15) // Ajustado Y de 19 para 15

      // Add generation date on the right
      doc.text(`Generated: ${currentDate}`, 240, 8, { align: 'right' })

      // Current vertical position tracker - começar mais próximo ao topo
      let yPosition = 25 // Reduzido de 35 para 25

      // Add summary section if data exists
      if (jsonData.content && Array.isArray(jsonData.content) && jsonData.content.length > 0) {
        // Calculate statistics
        const stats = calculateStatistics(jsonData.content)

        // Add summary box (mais compacto)
        doc.setDrawColor(75, 107, 175)
        doc.setLineWidth(0.5)
        doc.setFillColor(240, 245, 255)
        doc.roundedRect(10, yPosition, 277, 15, 3, 3, 'FD') // Reduzido altura de 20 para 15

        // Add summary title
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11) // Reduzido de 12 para 11
        doc.setTextColor(42, 73, 128)
        doc.text('REPORT SUMMARY', 15, yPosition + 6) // Ajustado Y e X

        // Add summary content
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8) // Reduzido de 10 para 9
        doc.setTextColor(60, 60, 60)

        let summaryX = 15 // Reduzido de 20 para 15
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

        // Update position after summary - menos espaçamento
        yPosition += 20 // Reduzido de 35 para 20

        // Add problematic tests section (se necessário - mais compacto)
        const problematicTests = getProblematicTests(jsonData.content)

        if (problematicTests.length > 0) {
          // Calculate height with menos espaçamento
          const rowHeight = 5 // Reduzido de 6 para 5
          const headerHeight = 12 // Reduzido de 15 para 12
          const marginTop = 3 // Reduzido de 5 para 3
          const marginBottom = 5 // Reduzido de 8 para 5
          const totalHeight =
            headerHeight + problematicTests.length * rowHeight + marginTop + marginBottom

          // Add problematic tests header com menos espaçamento
          doc.setDrawColor(75, 107, 175)
          doc.setLineWidth(0.5)
          doc.setFillColor(240, 245, 255)
          doc.roundedRect(10, yPosition, 277, totalHeight, 3, 3, 'FD')

          // Add title
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(11) // Reduzido de 12 para 11
          doc.setTextColor(42, 73, 128)
          doc.text('PROBLEMATIC TESTS', 15, yPosition + 6) // Ajustado de 20 para 15

          // Add column headers com menos espaçamento
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(6) // Reduzido de 9 para 8
          doc.setTextColor(60, 60, 60)
          let headerY = yPosition + marginTop + 8 // Reduzido de 10 para 8

          // Draw header line
          doc.setDrawColor(200, 200, 200)
          doc.setLineWidth(0.2)
          doc.line(15, headerY + 2, 280, headerY + 2)

          // Column headers com posicionamento ajustado
          doc.text('Test Name', 15, headerY)
          doc.text('±3s Count', 180, headerY)
          doc.text('±2s Count', 220, headerY)
          doc.text('Total Issues', 260, headerY)

          // List problematic tests
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(8) // Reduzido de 9 para 8

          problematicTests.forEach((test, index) => {
            const testY = headerY + 6 + index * rowHeight // Reduzido de 8 para 6

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

          // Update position after problematic tests - menos espaçamento
          yPosition += totalHeight + 5 // Reduzido de 10 para 5
        }

        if (jsonData.content.length > 0) {
          // Use section title for the data table (mais compacto)
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(9) // Reduzido de 12 para 11
          doc.setTextColor(42, 73, 128)
          doc.text('ANALYTICS ', 10, yPosition)

          yPosition += 7 // Reduzido de 10 para 7

          // Extract headers from first object
          const firstItem = jsonData.content[0]
          const headers = Object.keys(firstItem).filter((key) => key !== 'id' && key !== 'Id')

          // Use the mapping to get more descriptive headers
          const formattedHeaders = headers.map((header) => getDescriptiveHeader(header))

          // Extract rows - excluding Id column and format values, replacing "No rule broken" with "Average"
          const data = jsonData.content.map((item: { [x: string]: any }) =>
            headers.map((header) => formatRuleValue(header, item[header]))
          )

          // Diferentes configurações para primeira página e páginas subsequentes
          let firstPageDone = false
          let firstPageRowCount = 0
          const rowsPerPage = {
            firstPage: 5, // Reduzido de 8 para 7
            subsequentPages: 14 // Reduzido de 15 para 14
          }

          // Use autoTable with improved styling e otimizado para mais linhas por página
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
            // Gerenciar o número de linhas em cada página
            didDrawPage: function (data) {
              // Após desenhar a primeira página, atualizamos a configuração para as próximas páginas
              if (!firstPageDone) {
                firstPageDone = true
                firstPageRowCount = 0 // Reset contador ao mudar de página

                // Na próxima página, ajustar o espaço para acomodar mais linhas
                data.settings.margin.top = 20 // Reduzir margem superior nas páginas subsequentes
              }
            },

            // Nova estratégia para controlar linhas por página
            willDrawCell: function (data) {
              // Apenas afeta células do corpo (não cabeçalho) e apenas na primeira página
              if (data.section === 'body' && data.pageNumber === 0 && !firstPageDone) {
                // Se o índice da linha atual é diferente do anterior, estamos em uma nova linha
                if (data.row.index >= 0 && data.column.index === 0) {
                  firstPageRowCount++
                }

                // Se atingimos o limite de linhas e estamos prestes a desenhar mais uma
                if (firstPageRowCount > rowsPerPage.firstPage && data.cursor) {
                  // Forçar quebra de página movendo o cursor para o final da página
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
                  const violationType = getRuleViolationType(cellValue)

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
              cellWidth: 'auto' // Ajuste automático de largura para melhor distribuição do espaço
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
      className={`flex items-center justify-evenly rounded-lg p-1 text-textPrimary transition-all duration-300 ease-in-out focus:outline-none focus:ring-0 ${isGenerating ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'} `}
      aria-label='Export PDF'
    >
      {isGenerating ? (
        <Loader2 className='mr-2 size-5 animate-spin' />
      ) : (
        <FileText className='mr-2 size-5' />
      )}
      <span>Generate PDF</span>
    </button>
  )
}

export default GeneratePdf
