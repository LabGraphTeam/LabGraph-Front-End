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
  <div className='grid gap-2 text-xs text-textSecondary md:flex md:flex-col xl:mt-24'>
    <DateSelector {...dateSelectorProps} />
    <div className='grid items-end gap-2 md:flex'>
      <span className='text-textPrimary'>AnalyticsType:</span>
      <AnalyticsTypeSelector analyticsType={analyticsType} onChange={onAnalyticsTypeChange} />
      <span className='text-textPrimary'>Action:</span>
      <GeneratePdf
        jsonData={dataFetched}
        fileName={analyticsType}
        reportMonth={reportMonth}
        reportYear={reportYear}
        buttonText={'GENERATE REPORT'}
      />
    </div>
  </div>
)

export default ReportsControls
