import {
  cleanValue,
  createProcessedData,
  isValidValue
} from '@/features/analytics-upload-files/utils/fileProcessors'
import { FileProcessingResult } from '@/types/FileProcessing'
import { ProcessedData } from '@/types/UpdateResults'

export const processTextFile = async (file: File): Promise<FileProcessingResult> => {
  const arrayValues: ProcessedData[] = []
  const uniqueEntries = new Set<string>()
  const filteredLines: string[] = []

  try {
    const content = await file.text()
    const lines = content.split('\n').map((line) => line.trim())

    lines.forEach((line) => {
      if (line.includes('PCCC1') || line.includes('PCCC2')) {
        filteredLines.push(line)
      }
    })

    filteredLines.sort((a, b) => {
      const dateA = a.split(';')[4]
      const dateB = b.split(';')[4]
      return dateA.localeCompare(dateB)
    })
    const sortedLines = filteredLines

    for (const line of sortedLines) {
      const fields = line.split(';').map(cleanValue)
      const date = `${fields[4]}/${fields[5]}`
      const formattedDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)} ${date.slice(9)}`

      if (!isValidValue(fields[10])) continue

      const entryData = createProcessedData(fields, formattedDate)
      const entryKey = JSON.stringify(Object.values(entryData))

      if (!uniqueEntries.has(entryKey)) {
        uniqueEntries.add(entryKey)
        arrayValues.push(entryData)
      }
    }

    return { success: true, data: arrayValues }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
