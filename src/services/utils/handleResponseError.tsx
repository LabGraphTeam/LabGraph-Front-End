import { fetchWrapper } from '@/services/fetch-wrapper'

export const handleResponseError = async (response: Response): Promise<Response> => {
  try {
    if (!response.ok) {
      let errorMessage = response.statusText || 'Unknown error';

      const errorData = await response.json().catch(() => null);
      
      if (errorData?.details) {
        errorMessage = errorData.details;
      }

      if (response.status === 401 || response.status === 403) {
        return await fetchWrapper({ route: '/api/logout', method: 'POST' });
      }
      throw new Error(`${response.status} - ${errorMessage}`);
    }

    return response;
  } catch (error) {
    console.error('Error handling response:', error);

    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
}
