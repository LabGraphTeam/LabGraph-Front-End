import { FileProcessingResult } from '@/features/miscs/types/FileProcessing'
import { CSV_MINIMUM_COLUMNS } from '@/features/miscs/upload-results/constants/fileProcessing'
import { cleanValue, isValidValue } from './fileProcessors'
import { ProcessedData } from '@/features/miscs/types/UpdateResults'

export const processCsvFile = async (file: File): Promise<FileProcessingResult> => {
  const arrayValues: ProcessedData[] = []

  try {
    const content = await file.text()
    const lines = content.split('\n').map((line) => line.trim())

    for (const line of lines) {
      const data = line.split(',')

      if (data.length < CSV_MINIMUM_COLUMNS) {
        console.warn(`Skipping line due to insufficient columns: ${line}`)
        continue
      }

      if (!isValidValue(data[49])) continue

      const date = `${data[48]}`
      const formattedDate = `${date.slice(7, 11)}${date.slice(3, 6)}-${date.slice(1, 3)}${date.slice(11)}`

      const entryData: ProcessedData = {
        date: cleanValue(formattedDate),
        level_lot: cleanValue(data[55]),
        test_lot: 'nao se aplica',
        level: cleanValue(data[3]),
        unit_value: cleanValue(data[51]),
        name: cleanValue(data[1]),
        value: cleanValue(data[49]),
        mean: cleanValue(data[9]),
        sd: cleanValue(data[15])
      }

      arrayValues.push(entryData)
    }

    return { success: true, data: arrayValues }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
