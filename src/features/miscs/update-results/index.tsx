import React from 'react';
import { UploadButton } from './components/UploadButton';
import { useFileUpload } from './hooks/useFileUpload';

const UpdateResults: React.FC<{ analyticsType: string }> = ({ analyticsType }) => {
  const { status, handleFileUpload } = useFileUpload(analyticsType);

  return (
    <div className='flex items-center gap-0 text-textSecondary'>
      <UploadButton
        isProcessing={status.isProcessing}
        message={status.message}
        onChange={handleFileUpload}
      />
      {status.error && (
        <p className='ml-2 rounded-3xl text-xs text-textPrimary md:bg-danger md:px-1 md:py-2 md:text-white'>
          {status.error}
        </p>
      )}
    </div>
  );
};

export default UpdateResults;
