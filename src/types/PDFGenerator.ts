import { AnalyticItem } from './Chart'

/**
 * Represents an item in the data to be exported
 */
export interface DataItem {
  [key: string]: number | string | null | undefined
  id?: string | number
  Id?: string | number
}

/**
 * Represents the data structure being passed to the PDF generator
 */
export interface JsonData {
  content?: DataItem[]
  [key: string]: string | DataItem[] | undefined
}

/**
 * Props for the PDF generator component
 */
export interface PdfGeneratorProps {
  jsonData: AnalyticItem[]
  fileName?: string
  reportMonth?: string
  reportYear?: string | number
  buttonText?: string
}
