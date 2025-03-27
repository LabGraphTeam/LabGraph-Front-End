const getStatusMessage = (statusCode: number): string => {
  const statusMap: Record<number, string> = {
    200: 'Request successful',
    201: 'Resource created successfully',
    204: 'Request completed with no content',
    400: 'Invalid or malformed request',
    401: 'Authentication required',
    403: 'Access forbidden',
    404: 'Resource not found',
    408: 'Request timeout',
    409: 'Conflict: Duplicate values',
    429: 'Too many requests',
    500: 'Internal server error',
    502: 'Bad gateway',
    503: 'Service unavailable',
    504: 'Gateway timeout'
  }

  return statusMap[statusCode] || 'Unknown HTTP status'
}

export default getStatusMessage
