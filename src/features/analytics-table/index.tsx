import { useAnalyticsData } from '@/features/analytics-table/hooks/useAnalyticsData';
import useDateSelector from '@/features/shared/date-selector/hooks/useDateSelector';
import { useCallback, useEffect, useState } from 'react';
import { useAnalyticsOptions } from '../shared/ui/hooks/useAnalyticsOptions';
import useWindowDimensions from '../shared/ui/hooks/useWindowDimensions';
import MainLayout from './layouts/MainLayout';
import ListingTable from './listing-table';
import AnalyticsFilters from './util/AnalyticsFilters';
import AnalyticsPagination from './util/AnalyticsPagination';

const AnalyticsTableIndex = () => {
  const dateSelector = useDateSelector();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [analyticsType, setAnalyticsType] = useState('biochemistry-analytics');
  const [level, setLevel] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);

  const { width } = useWindowDimensions();
  const { analyticsOptions, levelOptions } = useAnalyticsOptions(analyticsType);

  const {
    data: dataFetched,
    isLoading,
    fetchData,
    buildUrl,
    totalPages,
  } = useAnalyticsData({
    analyticsType,
    level,
    startDate: {
      day: dateSelector.startDay,
      month: dateSelector.startMonth,
      year: dateSelector.startYear,
    },
    endDate: {
      day: dateSelector.endDay,
      month: dateSelector.endMonth,
      year: dateSelector.endYear,
    },
    itemsPerPage,
    currentPage,
  });

  useEffect(() => {
    const url = buildUrl(isFiltered);
    fetchData(url);
  }, [
    isFiltered,
    analyticsType,
    level,
    itemsPerPage,
    currentPage,
    dateSelector.startDay,
    dateSelector.startMonth,
    dateSelector.startYear,
    dateSelector.endDay,
    dateSelector.endMonth,
    dateSelector.endYear,
  ]);

  useEffect(() => {
    setItemsPerPage(width >= 1800 ? 14 : 8);
  }, [width]);

  const handlePageChange = useCallback(
    async (url: string): Promise<void> => {
      await fetchData(url);
    },
    [fetchData]
  );

  return (
    <MainLayout title={`LabGraph - ${analyticsType || 'Quality-Lab-Pro'}`}>
      <AnalyticsFilters
        dateSelector={dateSelector}
        analyticsOptions={analyticsOptions}
        analyticsType={analyticsType}
        setAnalyticsType={setAnalyticsType}
        levelOptions={levelOptions}
        level={level}
        setLevel={setLevel}
        setFiltered={setIsFiltered}
      />
      <ListingTable items={dataFetched} isLoading={isLoading} onPageChange={handlePageChange} />
      <AnalyticsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        dataFetched={dataFetched}
        setCurrentPage={setCurrentPage}
      />
    </MainLayout>
  );
};

export default AnalyticsTableIndex;
