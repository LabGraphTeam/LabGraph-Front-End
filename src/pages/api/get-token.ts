import type { NextApiRequest, NextApiResponse } from 'next'

interface ValidationResponse {
  valid: boolean
  message?: string
  token?: string
}

export default async function getToken(
  req: NextApiRequest,
  res: NextApiResponse<ValidationResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      valid: false,
      message: 'Method not allowed'
    })
  }

  try {
    const token = req.cookies.tokenJWT

    if (!token) {
      return res.status(401).json({
        valid: false,
        message: 'No token found'
      })
    }

    return res.status(200).json({ token: token, valid: true })
  } catch (error) {
    console.error('Token validation error:', error)
    return res.status(500).json({
      valid: false,
      message: 'Internal server error'
    })
  }
}
