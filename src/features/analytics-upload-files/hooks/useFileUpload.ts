import { API_ENDPOINTS } from '@/features/analytics-upload-files/constants/fileProcessing'
import { processCsvFile } from '@/features/analytics-upload-files/utils/processCsvFile'
import { processTextFile } from '@/features/analytics-upload-files/utils/processTxtFile'
import { useToken } from '@/features/authentication/contexts/TokenContext'
import { fetchWrapper } from '@/services/wrappers/fetch-wrapper'
import { ProcessedData, ProcessingStatus } from '@/types/UpdateResults'
import { useCallback, useState } from 'react'


export const useFileUpload = (analyticsType: string) => {
  const [status, setStatus] = useState<ProcessingStatus>({
    isProcessing: false,
    message: ''
  })
  const { token, isLoading } = useToken()

  const postResults = useCallback(
    async (data: ProcessedData[]) => {
      if (isLoading || !token) {
        setStatus({
          isProcessing: false,
          message: 'Authentication failed',
          error: 'No authentication token available'
        })
        return
      }

      const endpoint =
        analyticsType === 'biochemistry-analytics'
          ? API_ENDPOINTS.biochemistry
          : API_ENDPOINTS.coagulation
      const endpointUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`

      const response = await fetchWrapper({
        route: endpointUrl,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: data
      })
      if (response as Error) {
        setStatus({
          isProcessing: false,
          message: 'Data upload failed',
          error: response.message
        })
      }
      setStatus((prev) => ({ ...prev, message: 'Data successfully uploaded' }))
    },
    [analyticsType, token, isLoading]
  )

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setStatus({ isProcessing: true, message: 'Processing file...' })
    try {
      const result = file.name.endsWith('.csv')
        ? await processCsvFile(file)
        : await processTextFile(file)

      if (!result.success || !result.data) throw new Error(result.error)
      await postResults(result.data)
      setStatus({ isProcessing: false, message: 'Processing complete!' })
      window.location.reload()
    } catch (error) {
      setStatus({
        isProcessing: false,
        message: 'Processing failed',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      })
    }
  }

  return { status, handleFileUpload }
}
