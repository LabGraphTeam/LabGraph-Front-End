import TestSelectorWithoutLevel from '@/features/shared/ui/analytics-selectors/custom-selector'
import Footer from '@/features/shared/ui/footer'
import NavBar from '@/features/shared/ui/nav-bar'
import Loading from '@/features/shared/utils/components/loading'
import Head from 'next/head'
import React, { useState } from 'react'
import { AnalyticGroupedData, MultipleLineGraphProps } from '../types/Chart'
import MultipleLineControlChart from './components/MultipleLineControlChart'

const MultipleLineLabGraph: React.FC<MultipleLineGraphProps> = ({ testList, analyticsType }) => {
  const [groupResponse, setGroupResponse] = useState<AnalyticGroupedData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className='min-h-min'>
      <NavBar />
      <div className='flex min-h-min flex-col content-center items-center justify-evenly bg-background'>
        <Head>
          <title>{`LabGraph - ${testList[0] ?? ''}`}</title>
        </Head>
        <div className='flex flex-col'>
          <div className='mb-8 mt-14 flex justify-evenly md:mt-24 xl:mb-8 xl:mt-32'>
            <TestSelectorWithoutLevel
              name={testList[0]}
              setAnalyticItemList={setGroupResponse}
              analyticsType={analyticsType}
              testNameList={testList}
              setIsLoading={setIsLoading}
            />
          </div>
          <div className='flex min-h-full w-screen flex-col items-center justify-evenly'>
            {isLoading ? <Loading /> : <MultipleLineControlChart analyticsListData={groupResponse} />}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default MultipleLineLabGraph
