export interface UploadButtonProps {
  isProcessing: boolean;
  message: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
