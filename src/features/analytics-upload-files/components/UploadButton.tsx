import { UploadButtonProps } from '@/types/UpdateResults'
import { Upload } from 'lucide-react'
import React from 'react'

export const UploadButton: React.FC<UploadButtonProps> = ({ isProcessing, message, onChange }) => (
  <>
    <input
      type='file'
      id='fileInput'
      onChange={onChange}
      accept='.txt, .csv'
      className='hidden'
      disabled={isProcessing}
    />
    <label
      htmlFor='fileInput'
      title='Send analytics results TXT or CSV file'
      className={`cursor-pointer rounded border border-borderColor bg-background px-2 py-1 text-base text-textSecondary hover:scale-110 md:px-2 md:py-1 ${
        isProcessing ? 'cursor-not-allowed opacity-25' : ''
      }`}
    >
      <span className='hidden md:inline'>{isProcessing ? message : <Upload size={17} />}</span>
      <span className='inline md:hidden'>{isProcessing ? message : <Upload size={15} />}</span>
    </label>
  </>
)
