import { ProcessedData } from '@/features/charts/types/Chart'
import { MAX_VALUE } from '@/features/miscs/upload-results/constants/fileProcessing'

export const cleanValue = (value: string) => value.replace(/"/g, '').trim()

export const isValidValue = (value: string): boolean => {
  try {
    const numValue = parseFloat(cleanValue(value))
    return !isNaN(numValue) && numValue <= MAX_VALUE
  } catch {
    return false
  }
}

export const createProcessedData = (fields: string[], formattedDate: string): ProcessedData => ({
  date: formattedDate,
  level_lot: fields[16],
  test_lot: fields[17],
  level: fields[15],
  unit_value: fields[12],
  name: fields[9],
  value: fields[10],
  mean: fields[20],
  sd: fields[21]
})
