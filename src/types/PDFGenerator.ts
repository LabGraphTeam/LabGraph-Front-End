import { AnalyticItem } from './Chart'

export interface PdfGeneratorProps {
  jsonData: {
    content: AnalyticItem[]
  }
  fileName?: string
  reportMonth?: string
  reportYear?: number
  buttonText: string
}
