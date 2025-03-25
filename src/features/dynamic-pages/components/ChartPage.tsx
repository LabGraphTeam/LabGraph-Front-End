import GraphWrapper from '@/features/analytics-charts'
import { ChartPageProps } from '@/types/ChartPageProps'

export const ChartPageComponent = ({ chartType, config }: Readonly<ChartPageProps>) => {
  return (
    <GraphWrapper
      analyticsType={config.analyticsType}
      key={chartType}
      size={config.size}
      testList={config.testList}
    />
  )
}
