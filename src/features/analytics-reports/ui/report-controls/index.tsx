import AnalyticsTypeSelector from '@/features/analytics-reports/analytics-selector'
import GeneratePdf from '@/features/analytics-reports/generate-pdf'
import DateSelector from '@/features/shared/ui/date-selectors'
import { ReportsControlsProps } from '@/types/Reports'

const ReportsControls = ({
  analyticsType,
  onAnalyticsTypeChange,
  dataFetched,
  dateSelectorProps,
  reportMonth,
  reportYear
}: ReportsControlsProps) => (
  <div className='grid gap-1 text-textSecondary md:flex md:flex-col xl:mt-20'>
    <DateSelector {...dateSelectorProps} />
    <AnalyticsTypeSelector analyticsType={analyticsType} onChange={onAnalyticsTypeChange} />
    <div className='flex gap-1'>
      <span className='flex justify-evenly rounded-md border border-borderColor text-textSecondary shadow-sm shadow-shadow'>
        <GeneratePdf
          jsonData={dataFetched}
          fileName={analyticsType}
          reportMonth={reportMonth}
          reportYear={reportYear}
          buttonText={'generatePDF'}
        />
      </span>
    </div>
  </div>
)

export default ReportsControls
