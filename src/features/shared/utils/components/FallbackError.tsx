import { X, XCircle } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ErrorComponentProps {
  error: Error;
  isOpen?: boolean;
  onClose?: () => void;
}

const FallbackError = ({ error, isOpen = true, onClose }: ErrorComponentProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' onClick={onClose} />

      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <div className='bg-white rounded-lg p-6 max-w-sm w-full relative'>
          {onClose && (
            <button
              onClick={onClose}
              className='absolute top-2 right-2 text-gray-400 hover:text-gray-600'
              aria-label='Close'
            >
              <X size={20} />
            </button>
          )}

          <div className='flex items-center gap-3 text-red-600 mb-4'>
            <XCircle size={24} />
            <h2 className='text-lg font-medium'>Oops! Something went wrong</h2>
          </div>

          <p className='text-gray-600'>{error.message}</p>

          {onClose && (
            <div className='mt-6 flex justify-end'>
              <button
                onClick={onClose}
                className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm'
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FallbackError;
