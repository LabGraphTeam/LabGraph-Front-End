import { useToken } from '@/features/authentication/contexts/TokenContext';
import { fetchWrapper } from '@/services/fetch-wrapper';
import { useCallback, useEffect, useState } from 'react';
import { AnalyticWithStatsData, ListingCollection } from '../../types/Chart';

const useFetchListing = (url: string) => {
  const [listing, setListing] = useState<ListingCollection>([]);
  const [unitValues, setUnitValues] = useState<string>('-');
  const [ownMeanValue, setOwnMeanValue] = useState<number>(0);
  const [ownSdValue, setOwnSdValue] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const { token, isLoading } = useToken();

  const fetchData = useCallback(async (): Promise<AnalyticWithStatsData> => {
    let data = {} as AnalyticWithStatsData;

    if (!isLoading || token) {
      data = await fetchWrapper({
        route: url,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'force-cache',
        next: { revalidate: 1 },
      }) as AnalyticWithStatsData;
    }

    return data;

  }, [url, token, isLoading]);

  const handleFetchData = useCallback(async () => {
    try {
      const data = await fetchData();
      setOwnMeanValue(data.calcMeanAndStdDTO.mean ? data.calcMeanAndStdDTO.mean : 0);
      setOwnSdValue(
        data.calcMeanAndStdDTO.standardDeviation ? data.calcMeanAndStdDTO.standardDeviation : 0
      );
      setUnitValues(data.analyticsDTO[0]?.unit_value ?? '-');
      setListing(data.analyticsDTO);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }, [isLoading, token, fetchData]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return {
    listing,
    unitValues,
    ownMeanValue,
    ownSdValue,
    url,
    isLoading,
    error,
  };
};

export default useFetchListing;
