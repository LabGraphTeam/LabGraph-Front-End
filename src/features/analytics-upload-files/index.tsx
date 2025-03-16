import React from 'react';
import { UploadButton } from './components/UploadButton';
import { useFileUpload } from './hooks/useFileUpload';
import ErrorMessage from '@/features/shared/utils/components/error-message';

const UpdateResults: React.FC<{ analyticsType: string }> = ({ analyticsType }) => {
  const { status, handleFileUpload } = useFileUpload(analyticsType);

  return (
    <div className='flex items-center text-textSecondary'>
      <UploadButton
        isProcessing={status.isProcessing}
        message={status.message}
        onChange={handleFileUpload}
      />
      {status.error && (
        <ErrorMessage message={status.error} title='Upload failed'/>

      )}
    </div>
  );
};

export default UpdateResults;
