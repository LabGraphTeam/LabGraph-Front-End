import AnalyticsTypeSelector from '@/features/reports/analytics-selector'
import GeneratePdf from '@/features/reports/generate-pdf'
import DateSelector from '@/features/shared/ui/date-selectors'
import { ReportsControlsProps } from '../../types/Reports'

const ReportsControls = ({
  analyticsType,
  onAnalyticsTypeChange,
  dataFetched,
  dateSelectorProps,
  reportMonth,
  reportYear
}: ReportsControlsProps) => (
  <div className='grid gap-2 text-textSecondary md:flex xl:mt-14'>
    <DateSelector {...dateSelectorProps} />
    <AnalyticsTypeSelector analyticsType={analyticsType} onChange={onAnalyticsTypeChange} />
    <div className='flex gap-2'>
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
