import { useEffect, useState } from 'react';
import { AlertCircle, RotateCw, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  title?: string;
  timestamp?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  title = 'Oops! Something went wrong',
  timestamp = new Date().toLocaleTimeString(),
  onRetry 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleDismiss = () => {
    setIsVisible(false);
    window.location.reload();
  };

  const handleRetry = () => {
    onRetry?.();
    handleDismiss();
  };

  if (!isVisible || !message) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 transition-all duration-300" />
      <div
        role="alert"
        className="fixed left-1/2 top-1/2 z-50 flex w-[320px] 
          -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between
          rounded-lg bg-danger p-6 shadow-2xl md:w-[400px]"
      >
        <div className="absolute right-2 top-2">
          <button 
            onClick={handleDismiss}
            className="rounded-full p-1 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <AlertCircle size={50} className="mb-4 text-white" />
        
        <div className="flex w-full flex-col items-center gap-3 text-center">
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>
          
          <p className="px-4 text-sm text-white">
            {message}
          </p>
          <div className="text-xs text-white">
            Occurred at: {timestamp}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleDismiss}
            className="rounded-md border border-white px-4 py-2 
              text-sm font-medium text-white transition-colors"
          >
            Dismiss
          </button>
          
          {onRetry && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 rounded-md border 
                border-white px-4 py-2 text-sm font-medium 
                text-white transition-colors"
            >
              <RotateCw size={16} />
              Retry
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ErrorMessage;
