import { ChartPageComponent } from '@/features/dynamic-pages/components/ChartPage'
import { chartConfigs } from '@/features/dynamic-pages/config/chartConfigs'
import { ChartPageProps } from '@/types/ChartPageProps'
import { GetServerSideProps } from 'next'

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

export default function ChartPage(props: Readonly<ChartPageProps>) {
  return <ChartPageComponent {...props} />
}
