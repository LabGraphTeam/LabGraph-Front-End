import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 0
  }

  res.setHeader('Set-Cookie', serialize('tokenJWT', '', cookieOptions))
  return res.redirect(302, '/')

  return res.status(200).json({ success: true })
}
