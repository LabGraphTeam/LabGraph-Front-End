import { ProcessedData } from '@/features/miscs/types/UpdateResults'

export interface FileProcessingResult {
  success: boolean;
  data?: ProcessedData[];
  error?: string;
}

export interface DateExtractor {
  (line: string): string;
}
