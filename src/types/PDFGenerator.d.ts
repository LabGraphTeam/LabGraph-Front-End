import { AnalyticData } from './Chart'

export interface PdfGeneratorProps {
  jsonData: {
    content: AnalyticData[]
  }
  fileName?: string
  reportMonth?: string
  reportYear?: number
  buttonText: string
}
