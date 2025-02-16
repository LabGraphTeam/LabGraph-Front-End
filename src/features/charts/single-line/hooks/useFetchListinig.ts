import { useToken } from '@/features/authentication/contexts/TokenContext';
import { fetchWrapper } from '@/services/fetch-wrapper';
import { useCallback, useEffect, useState } from 'react';
import { FetchListingData, ListingCollection } from '../../types/Chart';

const useFetchListing = (url: string) => {
  const [listing, setListing] = useState<ListingCollection>([]);
  const [unitValues, setUnitValues] = useState<string>('-');
  const [ownMeanValue, setOwnMeanValue] = useState<number>(0);
  const [ownSdValue, setOwnSdValue] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { token, isLoading } = useToken();

  const fetchData = useCallback(async (): Promise<FetchListingData> => {
    let data = {} as FetchListingData;

    if (!isLoading) {
      data = await fetchWrapper({
        route: url,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return data;
  }, [url, token, isLoading]);

  const handleFetchData = useCallback(async () => {
    if (isLoading) return;

    setError(null);

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
  }, [isLoading, fetchData]);

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
