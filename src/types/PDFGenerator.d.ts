
export interface PdfGeneratorProps {
  analyticsType: string

  startDate: {
    day: number
    month: number
    year: number
  }

  endDate: {
    day: number
    month: number
    year: number
  }
  fileName?: string
  reportMonth?: string
  reportYear?: number
  buttonText: string

}
