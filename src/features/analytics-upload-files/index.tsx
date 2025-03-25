import { UploadButton } from '@/features/analytics-upload-files/components/UploadButton'
import { useFileUpload } from '@/features/analytics-upload-files/hooks/useFileUpload'
import ErrorMessage from '@/shared/utils/components/error-message'
import React from 'react'

const UpdateResults: React.FC<{ analyticsType: string }> = ({ analyticsType }) => {
  const { status, handleFileUpload } = useFileUpload(analyticsType)

  return (
    <div className='flex items-center text-textSecondary'>
      <UploadButton
        isProcessing={status.isProcessing}
        message={status.message}
        onChange={handleFileUpload}
      />
      {status.error ? <ErrorMessage message={status.error} title='Upload failed' /> : null}
    </div>
  )
}

export default UpdateResults
