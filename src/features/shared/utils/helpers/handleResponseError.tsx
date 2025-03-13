import  Router  from "next/router";

const handleResponseError = async (response: Response) => {
  const router = Router;

  try {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.details || response.statusText || 'Unknown error';
      console.error('API Error:', {
        status: response.status,
        message: errorMessage,
        url: response.url
      });
      if(response.status === 401 || response.status === 403) {
        return router.push('/auth/login');
      }
      throw Error(`${response.status} - ${errorMessage}`);
    }
    return response;
  } catch (error) {
    console.error('Error handling response:', error);
    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
};

export default handleResponseError;