import TestSelectorWithoutLevel from '@/features/shared/ui/analytics-selectors/custom-selector'
import Footer from '@/features/shared/ui/footer'
import NavBar from '@/features/shared/ui/nav-bar'
import Loading from '@/features/shared/utils/components/loading'
import { GroupedAnalyticData, MultipleLineGraphProps } from '@/types/Chart'
import Head from 'next/head'
import React, { useState } from 'react'
import MultipleLineControlChart from './components/MultipleLineControlChart'

const MultipleLineLabGraph: React.FC<MultipleLineGraphProps> = ({ testList, analyticsType }) => {
  const [analyticsGroupData, setAnalyticsGroupData] = useState<GroupedAnalyticData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className='mt-8 min-h-min'>
      <NavBar />
      <div className='flex min-h-min flex-col content-center items-center justify-evenly bg-background'>
        <Head>
          <title>{`LabGraph - ${testList[0] ?? ''}`}</title>
        </Head>
        <div className='flex flex-col'>
          <div className='mb-8 mt-14 flex justify-evenly md:mt-24 xl:mb-8 xl:mt-32'>
            <TestSelectorWithoutLevel
              analyticName={testList[0]}
              setAnalyticGroupedData={setAnalyticsGroupData}
              analyticsType={analyticsType}
              availableTestNames={testList}
              setIsLoading={setIsLoading}
            />
          </div>
          <div className='flex min-h-full w-screen flex-col items-center justify-evenly'>
            {isLoading ? (
              <Loading />
            ) : (
              <MultipleLineControlChart groupedAnalysisData={analyticsGroupData} />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default MultipleLineLabGraph
