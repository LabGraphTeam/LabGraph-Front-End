import { ProcessedData } from '@/types/UpdateResults'

export interface FileProcessingResult {
  success: boolean
  data?: ProcessedData[]
  error?: string
}

export type DateExtractor = (line: string) => string
