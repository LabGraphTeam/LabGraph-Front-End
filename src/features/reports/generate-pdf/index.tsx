import { FileText, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { CsvGeneratorProps } from '../../miscs/types/CsvGenerator';
import getStatusMessage from '../../shared/utils/helpers/getStatusMessage';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const GeneratePDF: React.FC<CsvGeneratorProps> = ({ 
  jsonData, 
  fileName = 'data.pdf',
  reportMonth,
  reportYear 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Helper function to format only decimal numbers
  const formatValue = (value: any): any => {
    if (typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)))) {
      const numValue = Number(value);
      // Only format numbers that have decimal places
      if (numValue % 1 !== 0) {
        return numValue.toFixed(2);
      }
      return numValue;
    }
    return value;
  };

  // Column header mapping for better description
  const columnMapping: Record<string, string> = {
    'DATE': 'Date of Analysis',
    'LEVEL_LOT': 'Control Level Lot',
    'TEST_LOT': 'Test Lot Number',
    'NAME': 'Test Name',
    'LEVEL': 'Control Level',
    'VALUE': 'Measured Value',
    'MEAN': 'Mean Value',
    'SD': 'Standard Deviation',
    'UNIT_VALUE': 'Unit of Measurement',
    'RULES': 'Quality Rules',
    'DESCRIPTION': 'Test Description'
  };

  // Function to map column headers to descriptive labels
  const getDescriptiveHeader = (header: string): string => {
    const upperHeader = header.toUpperCase();
    return columnMapping[upperHeader] || upperHeader;
  };

  const generatePdf = () => {
    if (isGenerating) return;
    if (!jsonData) return;
    setIsGenerating(true);

    try {
      // Create PDF with better quality settings
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // Get month and year for the title (use provided values or current date)
      const month = reportMonth?.toLocaleUpperCase() || new Date().toLocaleString('default', { month: 'long' }).toUpperCase();
      const year = reportYear?.toString().toLocaleUpperCase() || new Date().getFullYear();
      const reportTitle = fileName.replace(/-/g, ' ').replace('.pdf', '').replace('analytics', '').toUpperCase();
      const currentDate = new Date().toLocaleDateString();
      
      // Add company logo/header
      doc.setFillColor(42, 73, 128); // Dark blue header
      doc.rect(0, 0, 297, 20, 'F');
      
      // Add title with better formatting
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255); // White text
      doc.setFont("helvetica", "bold");
      doc.text(`${reportTitle}`, 10, 10);
      
      // Add date information
      doc.setFontSize(10);
      doc.text(`${month} ${year}`, 10, 15);
      
      // Add generation date on the right
      doc.text(`Generated: ${currentDate}`, 240, 15, { align: 'right' });
      
      if (jsonData.content && Array.isArray(jsonData.content)) {
        if (jsonData.content.length > 0) {
          // Extract headers from first object
          const firstItem = jsonData.content[0];
          const headers = Object.keys(firstItem).filter(key => key !== 'id' && key !== 'Id');
          
          // Use the mapping to get more descriptive headers
          const formattedHeaders = headers.map(header => getDescriptiveHeader(header));

          // Extract rows - excluding Id column and format numeric values
          const data = jsonData.content.map((item: { [x: string]: any; }) => 
            headers.map(header => formatValue(item[header]))
          );
          
          // Use autoTable with improved styling and descriptive headers
          autoTable(doc, {
            head: [formattedHeaders],
            body: data,
            startY: 25, // Start below the header
            theme: 'grid',
            headStyles: {
              fillColor: [75, 107, 175], // Light blue header
              textColor: [255, 255, 255],
              fontStyle: 'bold',
              halign: 'center',
              fontSize: 8, // Slightly smaller to fit longer descriptions
              cellPadding: 2
            },
            alternateRowStyles: {
              fillColor: [240, 240, 240] // Light gray for alternate rows
            },
            bodyStyles: {
              fontSize: 8,
              lineWidth: 0.1,
              lineColor: [170, 170, 170]
            },
            margin: { top: 25, right: 10, bottom: 20, left: 10 },
          });
        }
      }
      
      // Save the PDF with month and year in filename
      const formattedFileName = `${month}_${year}_${reportTitle.toLowerCase().replace(/\s+/g, '_')}`;
      doc.save(formattedFileName.endsWith('.pdf') ? formattedFileName : `${formattedFileName}.pdf`);
      
    } catch (error: Error | any) {
      console.log(error);
      alert('Error generating PDF: ' + getStatusMessage(error.status));
    } finally {
      setIsGenerating(false);
    }
  };

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
  );
};

export default GeneratePDF;
