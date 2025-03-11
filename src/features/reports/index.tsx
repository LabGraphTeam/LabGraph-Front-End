import useReportsData from '@/features/reports/hooks/useReportsData';
import ReportImage from '@/features/reports/report-image';
import ReportsControls from '@/features/reports/reports-controls';
import ReportsHeader from '@/features/reports/reports-header';
import {
  formatDateWithTime,
  formatEndDateWithTime,
} from '@/features/shared/date-selector/constants/formatDateWithTime';
import useDateSelector from '@/features/shared/date-selector/hooks/useDateSelector';
import { DateSelectorProps } from '@/features/shared/date-selector/types/dateSelectorProps';
import Footer from '@/features/shared/ui/footer';
import { useState } from 'react';

const Reports = () => {
  const [analyticsType, setAnalyticsType] = useState<string>('biochemistry-analytics');
  const dateSelector = useDateSelector();

  const { startDay, startMonth, startYear, endDay, endMonth, endYear } =
    dateSelector as DateSelectorProps;
    
  // Create a formatted month string for reports
  const getMonthName = (month: number) => {
    const date = new Date();
    date.setMonth(month - 1); // month is 1-indexed in the app, but 0-indexed in Date
    return date.toLocaleString('default', { month: 'long' });
  };
  
  const reportMonth = getMonthName(startMonth);

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${analyticsType}/${
    process.env.NEXT_PUBLIC_API_BASE_URL_REPORTS
  }startDate=${formatDateWithTime(startYear, startMonth, startDay)}&endDate=${formatEndDateWithTime(
    endYear,
    endMonth,
    endDay
  )}`;

  const { dataFetched } = useReportsData({ url });

  return (
    <div className='flex min-h-screen flex-col justify-evenly'>
      <ReportsHeader analyticsType={analyticsType} dataFetched={dataFetched} />
      <main className='mt-16 flex grow flex-col items-center justify-evenly bg-background xl:mt-16'>
        <ReportsControls
          analyticsType={analyticsType}
          onAnalyticsTypeChange={setAnalyticsType}
          dataFetched={dataFetched}
          dateSelectorProps={dateSelector}
          reportMonth={reportMonth}
          reportYear={startYear}
          {...dateSelector}
        />
        <ReportImage />
        <div className='mt-16 flex flex-col place-content-end items-center'>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Reports;
