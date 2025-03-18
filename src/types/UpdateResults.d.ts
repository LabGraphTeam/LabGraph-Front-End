export interface UploadButtonProps {
  isProcessing: boolean;
  message: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export interface ProcessedData {
  date: string
  level_lot: string
  test_lot: string
  level: string
  unit_value: string
  name: string
  value: string
  mean: string
  sd: string
}


export interface ProcessingStatus {
  isProcessing: boolean
  message: string
  error?: string
}