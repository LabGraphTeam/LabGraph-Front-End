import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ErrorResponse {
  message: string;
  status: number;
}

interface SuccessResponse {
  success: boolean;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed',
      status: 405,
    });
  }

  try {
    const { token, remember, dateExp } = req.body;

    if (!token || typeof token !== 'string') {
      console.error('Token missing or not a string');
      return res.status(400).json({
        message: 'Invalid or missing token',
        status: 400,
      });
    }

    const maxAgeInSeconds = remember
      ? Math.floor((new Date(dateExp).getTime() - Date.now()) / 1000)
      : undefined;

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: maxAgeInSeconds,
    };

    res.setHeader('Set-Cookie', serialize('tokenJWT', token, cookieOptions));
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      status: 500,
    });
  }
}
