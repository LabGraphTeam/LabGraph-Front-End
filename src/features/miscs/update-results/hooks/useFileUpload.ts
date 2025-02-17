import { useToken } from '@/features/authentication/contexts/TokenContext';
import { processCsvFile, processTextFile } from '@/features/shared/utils/helpers/fileProcessors';
import { fetchWrapper } from '@/services/fetch-wrapper';
import { useCallback, useState } from 'react';
import { ProcessingStatus } from '../../../charts/types/Chart';
import getStatusMessage from '../../../shared/utils/helpers/getStatusMessage';
import { API_ENDPOINTS } from '../../csv-generator/constants/fileProcessing';

export const useFileUpload = (analyticsType: string) => {
  const [status, setStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    message: '',
  });
  const { token, isLoading } = useToken();

  const postResults = useCallback(
    async (data: any) => {
      if (isLoading || !token) {
        setStatus({
          isProcessing: false,
          message: 'Authentication failed',
          error: 'No authentication token available',
        });
        return;
      }

      try {
        const endpoint =
          analyticsType === 'biochemistry-analytics'
            ? API_ENDPOINTS.biochemistry
            : API_ENDPOINTS.coagulation;
        const endpointUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;

        const response = await fetchWrapper({
          route: endpointUrl,
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(getStatusMessage(response.status));
        setStatus((prev) => ({ ...prev, message: 'Data successfully uploaded' }));
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown error');
      }
    },
    [analyticsType, token, isLoading]
  );

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus({ isProcessing: true, message: 'Processing file...' });
    try {
      const result = file.name.endsWith('.csv')
        ? await processCsvFile(file)
        : await processTextFile(file);

      if (!result.success || !result.data) throw new Error(result.error);
      await postResults(result.data);
      setStatus({ isProcessing: false, message: 'Processing complete!' });
      window.location.reload();
    } catch (error) {
      setStatus({
        isProcessing: false,
        message: 'Processing failed',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  };

  return { status, handleFileUpload };
};
