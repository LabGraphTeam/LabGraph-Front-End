import handleResponseError from '@/features/shared/utils/helpers/handleResponseError';
import { FetchOptions } from '@/services/types/FetchOptions';

export const fetchWrapper = async (options: FetchOptions) => {
  const { route, method = 'GET', body, headers = {} } = options;
  try {
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }
    const response = await fetch(`${route}`, fetchOptions);
    if (!response.ok) {
      return handleResponseError(response);
    }
    return await response.json();
  } catch (error) {
    console.error(`Fetch error for ${route}:`, error);
    throw error;
  }
};
