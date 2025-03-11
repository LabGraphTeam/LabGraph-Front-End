import Router from "next/router";

const handleResponseError = async (response: Response) => {
  try {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.details || response.statusText || 'Unknown error';
      console.error('API Error:', {
        status: response.status,
        message: errorMessage,
        url: response.url
      });
      
      // Redirect to login page for authentication issues (401 Unauthorized or 403 Forbidden)
      if (response.status === 401 || response.status === 403) {
        console.log('Authentication error, redirecting to login...');
        Router.push('/login');
        return Promise.reject(new Error('Authentication required'));
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
