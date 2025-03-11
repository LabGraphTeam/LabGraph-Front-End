import { parse } from 'json2csv';
import { Download, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { CsvGeneratorProps } from '../../miscs/types/CsvGenerator';
import getStatusMessage from '../../shared/utils/helpers/getStatusMessage';

const GenerateReports: React.FC<CsvGeneratorProps> = ({ 
  jsonData, 
  fileName = 'data.csv',
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

  const generateCsv = () => {
    if (isGenerating) return;
    if (!jsonData) return;
    setIsGenerating(true);

    try {
      // Filter out the "Id" column and format numeric values
      const filteredData = jsonData.content.map((item: { [x: string]: any; id?: any; Id?: any; }) => {
        // Create a new object without the "Id" property and with formatted numeric values
        const { id, Id, ...rest } = item;
        
        // Format numeric values
        const formattedItem: { [key: string]: any } = {};
        Object.keys(rest).forEach(key => {
          formattedItem[key] = formatValue(rest[key]);
        });
        
        return formattedItem;
      });
      
      const csv = parse(filteredData);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);

      // Get month and year for the filename
      const month = reportMonth || new Date().toLocaleString('default', { month: 'long' });
      const year = reportYear || new Date().getFullYear();
      
      // Create filename with month and year
      const formattedFileName = `${month}_${year}_${fileName}`;

      const a = document.createElement('a');
      a.href = url;
      a.download = formattedFileName.endsWith('.csv') ? formattedFileName : `${formattedFileName}.csv`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error: Error | any) {
      console.log(error);
      alert('Error generating CSV: ' + getStatusMessage(error.status));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generateCsv}
      disabled={isGenerating}
      className={`flex items-center justify-evenly rounded-lg p-1 text-textPrimary transition-all duration-300 ease-in-out focus:outline-none focus:ring-0 ${isGenerating ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'} `}
      aria-label='Export CSV'
    >
      {isGenerating ? (
        <Loader2 className='mr-2 size-5 animate-spin' />
      ) : (
        <Download className='mr-2 size-5' />
      )}
      <span>Generate Report</span>
    </button>
  );
};

export default GenerateReports;
