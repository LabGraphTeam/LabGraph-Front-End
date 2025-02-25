import { useToken } from '@/features/authentication/contexts/TokenContext';
import getStatusMessage from '@/features/shared/utils/helpers/getStatusMessage';
import { fetchWrapper } from '@/services/fetch-wrapper';
import { useCallback, useEffect, useState } from 'react';
import { LevelGroupResponse } from '../../types/Chart';

const useFetchListeningGrouped = (url: string) => {
  const [listing, setListing] = useState<LevelGroupResponse[]>([]);
  const [unitValues, setUnitValues] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, isLoading: loading } = useToken();

  const fetchData = useCallback(async (): Promise<LevelGroupResponse[]> => {
    if (!token) throw new Error('No authentication token available');

    const data = await fetchWrapper({
      route: url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data as LevelGroupResponse[];
  }, [url, token]);

  useEffect(() => {
    if (loading) return;

    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        const listingData = await fetchData();
        setListing(listingData);

        if (listingData.length > 0 && listingData[0].groupedValuesByLevelDTO.values.length > 0) {
          setUnitValues(listingData[0].groupedValuesByLevelDTO.values[0].unit_value);
        }
      } catch (error: any) {
        const errorMessage = getStatusMessage(error.status);
        setError(errorMessage);
        console.error('Error fetching data:', errorMessage);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [loading, fetchData]);

  return {
    listing,
    unitValues,
    isLoading,
    error,
  };
};

export default useFetchListeningGrouped;
