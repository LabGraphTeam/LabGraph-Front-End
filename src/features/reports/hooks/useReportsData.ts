import { useToken } from '@/features/authentication/contexts/TokenContext';
import { ListingItem } from '@/features/charts/types/Chart';
import { fetchWrapper } from '@/services/fetch-wrapper';
import { useEffect, useState } from 'react';
import { UseReportsDataProps } from '../types/Reports';

const useReportsData = ({ url }: UseReportsDataProps) => {
  const { token, isLoading: loading } = useToken();

  const [dataFetched, setDataFetched] = useState<ListingItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;
      try {
        const result:ListingItem[] = await fetchWrapper({
          route: url,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setDataFetched(result); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url, loading, token]);

  return { dataFetched };
};

export default useReportsData;
