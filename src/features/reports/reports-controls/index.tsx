import { ListingItem } from '@/features/charts/types/Chart';
import AnalyticsTypeSelector from '@/features/reports/analytics-type-selector';
import GenerateReports from '@/features/reports/generate-csv';
import GeneratePDF from '@/features/reports/generate-pdf';
import DateSelector from '@/features/shared/date-selector';
import { DateSelectorProps } from '@/features/shared/date-selector/types/dateSelectorProps';

interface ReportsControlsProps extends DateSelectorProps {
  analyticsType: string;
  onAnalyticsTypeChange: (value: string) => void;
  dataFetched: ListingItem[];
  dateSelectorProps: DateSelectorProps;
  reportMonth?: string;
  reportYear?: number;
}

const ReportsControls = ({
  analyticsType,
  onAnalyticsTypeChange,
  dataFetched,
  dateSelectorProps,
  reportMonth,
  reportYear,
}: ReportsControlsProps) => (
  <div className='grid gap-2 text-textSecondary md:flex xl:mt-14'>
    <DateSelector {...dateSelectorProps} />
    <AnalyticsTypeSelector analyticsType={analyticsType} onChange={onAnalyticsTypeChange} />
    <div className='flex gap-2'>
      <span className='flex justify-evenly rounded-md border border-borderColor text-textSecondary shadow-sm shadow-shadow'>
        <GenerateReports 
          jsonData={dataFetched}
          fileName={analyticsType}
          reportMonth={reportMonth}
          reportYear={reportYear} buttonText={'generateCSV'}        />
      </span>
      <span className='flex justify-evenly rounded-md border border-borderColor text-textSecondary shadow-sm shadow-shadow'>
        <GeneratePDF 
          jsonData={dataFetched}
          fileName={analyticsType}
          reportMonth={reportMonth}
          reportYear={reportYear} buttonText={'generatePDF'}        />
      </span>
    </div>
  </div>
);

export default ReportsControls;
