import { useAnalyticsGraph } from '@/features/analytics-charts/hooks/useAnalyticsGraph'
import { TbChartAreaLine, TbChartLine } from 'react-icons/tb'

const ViewToggleButton = () => {
  const { viewMode, toggleView } = useAnalyticsGraph()

  return (
    <button
      className='mt-1 flex items-center rounded-full text-textPrimary'
      onClick={toggleView}
      title={`${viewMode === 'single' ? 'Switch to' : 'Back to'} ${viewMode === 'single' ? 'multi line' : 'line'}`}
    >
      {viewMode === 'single' ? (
        <TbChartAreaLine className='size-7 opacity-80' strokeWidth='1.5' />
      ) : (
        <TbChartLine className='size-7 opacity-80' strokeWidth='1.5' />
      )}
    </button>
  )
}

export default ViewToggleButton
