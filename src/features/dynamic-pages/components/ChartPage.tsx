import GraphWrapper from '@/features/analytics-charts'
import { ChartPageProps } from '@/types/ChartPageProps'

export function ChartPageComponent({ chartType, config }: Readonly<ChartPageProps>) {
  return (
    <GraphWrapper
      key={chartType}
      testList={config.testList}
      analyticsType={config.analyticsType}
      size={config.size}
    />
  )
}
