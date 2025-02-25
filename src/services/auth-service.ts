import { AuthFormData } from '@/features/authentication/types/Auth';
import { API_BASE_URL } from './constants/apiBaseUrl';
import { fetchWrapper } from './fetch-wrapper';
import { AuthParams } from './types/AuthParams';

export const authService = {
  signIn: async ({ identifier, password, remember }: AuthParams) => {
    try {
      const backendResponse = await fetchWrapper({
        route: `${API_BASE_URL}/users/sign-in`,
        method: 'POST',
        body: { identifier, password },
      });

      const cookieResponse = await fetchWrapper({
        route: '/api/login',
        method: 'POST',
        body: {
          token: backendResponse.tokenJWT,
          dateExp: backendResponse.dateExp,
          remember,
        },
      });

      return cookieResponse;
    } catch (error) {
      console.error('SignIn error:', error);
      throw error;
    }
  },

  async signUp(userData: Omit<AuthFormData, 'confirmPassword'>) {
    try {
      const response = await fetchWrapper({
        route: `${API_BASE_URL}/users/sign-up`,
        method: 'POST',
        body: userData,
      });

      return response;
    } catch (e) {
      console.error('Error parsing response:', e);
    }
  },
};
