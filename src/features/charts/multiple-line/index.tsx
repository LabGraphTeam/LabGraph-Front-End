import NavBar from '@/features/shared/navigation-bar';
import TestSelectorWithoutLevel from '@/features/shared/test-selector/custom-selector';
import Footer from '@/features/shared/ui/footer';
import Loading from '@/features/shared/utils/components/loading';
import Head from 'next/head';
import React, { useState } from 'react';
import { LevelGroupResponse, MultipleLineGraphProps } from '../types/Chart';
import MultipleLineControlChart from './components/MultipleLineControlChart';

const MultipleLineLabGraph: React.FC<MultipleLineGraphProps> = ({ testList, analyticsType }) => {
  const [groupResponse, setGroupResponse] = useState<LevelGroupResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
              setListing={setGroupResponse}
              analyticsType={analyticsType}
              testNameList={testList}
              setIsLoading={setIsLoading}
            />
          </div>
          <div className='flex min-h-full w-screen flex-col items-center justify-evenly'>
            {isLoading ? <Loading /> : <MultipleLineControlChart listings={groupResponse} />}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MultipleLineLabGraph;
