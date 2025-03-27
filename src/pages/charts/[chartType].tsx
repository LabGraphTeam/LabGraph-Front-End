import { GetServerSideProps } from 'next'

import { ChartPageComponent } from '@/features/dynamic-pages/components/ChartPage'
import { chartConfigs } from '@/features/dynamic-pages/config/chartConfigs'
import { ChartPageProps } from '@/types/ChartPageProps'

export const getServerSideProps: GetServerSideProps<ChartPageProps> = async ({ params }) => {
  const chartType = params?.chartType as string
  const config = chartConfigs[chartType]

  if (!config) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      chartType,
      config
    }
  }
}

const ChartPage = (props: Readonly<ChartPageProps>) => {
  return <ChartPageComponent {...props} />
}

export default ChartPage
