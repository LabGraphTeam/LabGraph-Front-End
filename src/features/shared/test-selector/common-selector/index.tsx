import useFetchListing from '@/features/charts/single-line/hooks/useFetchListinig';
import { ListingItem } from '@/features/charts/types/Chart';
import React, { useEffect, useState } from 'react';
import MeanAndDeviationDisplay from '../../../charts/mean-deviation';
import DateSelector from '../../date-selector';
import useDateSelector from '../../date-selector/hooks/useDateSelector';
import { useAnalyticsOptions } from '../../ui/hooks/useAnalyticsOptions';
import urlAnalyticsByNameAndDateAndLevel from '../../utils/helpers/urlAnalyticsByNameAndDateAndLevel';
import TestSelectorActions from '../components/TestSelectorActions';
import { CommonTestSelectorProps } from '../types/SelectorProps';

const TestSelectorWithLevel: React.FC<CommonTestSelectorProps> = ({
  testNameList: list,
  analyticsType,
  name,
  level,
  setListingItem,
  setIsLoading,
}) => {
  const [testName, setTestName] = useState<string>(name);
  const [testLevel, setTestLevel] = useState<number>(level ?? 1);

  const {
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
    handleStartDayChange,
    handleStartMonthChange,
    handleStartYearChange,
    handleEndDayChange,
    handleEndMonthChange,
    handleEndYearChange,
  } = useDateSelector();

  const props = urlAnalyticsByNameAndDateAndLevel({
    analyticsType,
    name: testName,
    level: testLevel,
    date: { startDay, startMonth, startYear, endDay, endMonth, endYear },
  });

  const { listing, ownMeanValue, ownSdValue, unitValues } = useFetchListing(props.url);

  useEffect(() => {
    setIsLoading(true);
    if (listing) {
      const updatedListing: ListingItem[] = listing.map((item) => ({
        ...item,
        ownMeanValue,
        ownSdValue,
      }));
      setListingItem(updatedListing);
      if (updatedListing.length > 0) {
        setIsLoading(false);
      }
    }
  }, [
    listing,
    ownMeanValue,
    ownSdValue,
    unitValues,
    testName,
    testLevel,
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
    setListingItem,
    setIsLoading,
  ]);

  const GOOGLE_SHEET_URL = process.env.NEXT_PUBLIC_API_GOOGLE_SHEETS_LINK;
  const { levelOptions } = useAnalyticsOptions(analyticsType);

  return (
    <div className='mt-8 grid content-center justify-center items-center gap-1 text-textSecondary md:mt-0 md:flex md:w-full md:justify-around'>
      <DateSelector
        startDay={startDay}
        startMonth={startMonth}
        startYear={startYear}
        endDay={endDay}
        endMonth={endMonth}
        endYear={endYear}
        handleStartDayChange={handleStartDayChange}
        handleStartMonthChange={handleStartMonthChange}
        handleStartYearChange={handleStartYearChange}
        handleEndDayChange={handleEndDayChange}
        handleEndMonthChange={handleEndMonthChange}
        handleEndYearChange={handleEndYearChange}
      />
      <div className='grid grid-cols-1 gap-1'>
        <TestSelectorActions
          testNameList={list}
          testName={testName}
          setTestName={setTestName}
          levelOptions={levelOptions}
          testLevel={testLevel}
          setTestLevel={setTestLevel}
          analyticsType={analyticsType}
          googleSheetUrl={GOOGLE_SHEET_URL ?? ''}
        />
        <MeanAndDeviationDisplay
          mean={listing[0]?.mean}
          sd={listing[0]?.sd}
          ownMean={ownMeanValue}
          ownSd={ownSdValue}
          unitValue={unitValues}
        />
      </div>
    </div>
  );
};

export default TestSelectorWithLevel;
