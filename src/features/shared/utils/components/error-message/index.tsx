import { AlertCircle, RotateCw, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  title?: string;
  timestamp?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  title = 'Oops! Something went wrong',
  timestamp = new Date().toLocaleTimeString(),
  onRetry,
  onDismiss 
}) => {
  const handleDismiss = () => {
    onDismiss?.();
    window.location.reload();
  };

  const handleRetry = () => {
    onRetry?.();
    handleDismiss();
  };

  if (!message) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 transition-all duration-300" />
      <div
        className="fixed left-1/2 top-1/2 z-50 flex w-[340px] 
          -translate-x-1/2 -translate-y-1/2 flex-col items-center 
          justify-between rounded-xl bg-gradient-to-br from-background 
          to-surface p-8 shadow-2xl ring-1 ring-primary animate-in fade-in 
          animate-in fade-in duration-200 md:w-[420px]"
        role="alert"
      >
        <div className="absolute right-3 top-3">
          <button 
            className="rounded-full p-1.5 text-primary hover:bg-primary/10 
              transition-colors duration-200"
            onClick={handleDismiss}
          >
            <X size={20} />
          </button>
        </div>

        <AlertCircle className="mb-5 text-danger animate-bounce" size={56} />
        
        <div className="flex w-full flex-col items-center gap-4 text-center">
          <h3 className="text-xl font-bold text-primary">
            {title}
          </h3>
          
          <p className="px-4 text-sm text-primary leading-relaxed">
            {message}
          </p>
          <div className="text-xs text-primary font-medium">
            Occurred at: {timestamp}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            className="rounded-lg border border-primary px-5 py-2.5 
              text-sm font-semibold text-primary hover:scale-105
              transition-colors duration-200"
            onClick={handleDismiss}
          >
            Dismiss
          </button>
          
          {onRetry ? <button
              className="flex items-center gap-2 rounded-lg 
                bg-primary px-5 py-2.5 text-sm font-semibold 
                text-red-600 hover:scale-105 transition-colors duration-200"
              onClick={handleRetry}
            >
              <RotateCw size={16} />
              Retry
            </button> : null}
        </div>
      </div>
    </>
  );
};

export default ErrorMessage;
