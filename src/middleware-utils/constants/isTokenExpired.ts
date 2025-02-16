import { TokenPayload } from '../type/TokenPayload';

export const isTokenExpired = (token: string): boolean => {
  try {
    const [, payloadBase64] = token.split('.');
    if (!payloadBase64) return true;

    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString()) as TokenPayload;
    const expirationDate = new Date(payload.exp * 1000);
    return new Date() > expirationDate;
  } catch {
    return true;
  }
};
