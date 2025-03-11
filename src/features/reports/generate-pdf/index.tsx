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

  // Helper function to format numeric values
  const formatValue = (value: any): any => {
    if (typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)))) {
      const numValue = Number(value);
      return numValue.toFixed(2);
    }
    return value;
  };

  const generatePdf = () => {
    if (isGenerating) return;
    if (!jsonData) return;
    setIsGenerating(true);

    try {
      const doc = new jsPDF();
      
      // Get month and year for the title (use provided values or current date)
      const month = reportMonth?.toLocaleUpperCase() || new Date().toLocaleString('default', { month: 'long' });
      const year = reportYear?.toString().toLocaleUpperCase() || new Date().getFullYear();
      
      // Add title with month and report type
      doc.setFontSize(16);
      doc.text(`${month} ${year} - ${fileName.replace(/-/g, ' ').toUpperCase()}`, 14, 15);
      
      // Process the data for the table
      if (jsonData.content && Array.isArray(jsonData.content)) {
        if (jsonData.content.length > 0) {
          // Extract headers from first object
          const firstItem = jsonData.content[0];
          const headers = Object.keys(firstItem).filter(key => key !== 'id' && key !== 'Id');
          
          const formatedHeaders = Object.keys(firstItem).filter(key => key !== 'id' && key !== 'Id').map(key => key.toUpperCase());

          // Extract rows - excluding Id column and format numeric values
          const data = jsonData.content.map((item: { [x: string]: any; }) => 
            headers.map(header => formatValue(item[header]))
          );
          
          // Use autoTable directly as a function instead of as a method on doc
          autoTable(doc, {
            head: [formatedHeaders],
            body: data,
            startY: 30,
            theme: 'grid',
            styles: { fontSize: 6 }
          });
        }
      }
      
      // Save the PDF with month and year in filename
      const formattedFileName = `${month}_${year}_${fileName}`;
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
