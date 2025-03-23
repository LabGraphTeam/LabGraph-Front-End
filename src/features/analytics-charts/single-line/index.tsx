import ControlChart from '@/features/analytics-charts/single-line/components/ControlChart'
import TestSelectorWithLevel from '@/features/shared/ui/analytics-selectors/selector'
import Footer from '@/features/shared/ui/footer'
import NavBar from '@/features/shared/ui/nav-bar'
import Loading from '@/features/shared/utils/components/loading'
import { AnalyticWithStatsData, SingleLineGraphProps } from '@/types/Chart'
import Head from 'next/head'
import { useState } from 'react'

const LabGraph: React.FC<SingleLineGraphProps> = ({ testList, analyticsType }) => {
  const [dataFetched, setDataFetched] = useState<AnalyticWithStatsData>()
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className='mt-8 min-h-min gap-4'>
      <NavBar />
      <div className='flex min-h-min flex-col place-content-center items-center bg-background'>
        <Head>
          <title>{`LabGraph - ${testList[0] || ''}`}</title>
        </Head>
        <div className='flex flex-col'>
          <div className='mb-4 ml-4 mt-12 flex justify-start md:mt-24 xl:mb-8 xl:mt-32'>
            <TestSelectorWithLevel
              analyticName={testList[0]}
              analyticLevel={1}
              setIsLoading={setIsLoading}
              setAnalyticListData={setDataFetched}
              analyticsType={analyticsType}
              availableTestNames={testList}
            />
          </div>
          <div className='flex min-h-full w-screen flex-col items-center justify-center'>
            {isLoading ? (
              <Loading />
            ) : (
              <ControlChart
                calcMeanAndStdDTO={{
                  mean: dataFetched?.calcMeanAndStdDTO.mean ?? 0,
                  standardDeviation: dataFetched?.calcMeanAndStdDTO.standardDeviation ?? 0
                }}
                analyticsDTO={dataFetched?.analyticsDTO ?? []}
              />
            )}
          </div>
        </div>
      </div>
      <div className='mt-6 flex min-h-min flex-col content-center items-center justify-end xl:mt-8'>
        <Footer />
      </div>
    </div>
  )
}

export default LabGraph
