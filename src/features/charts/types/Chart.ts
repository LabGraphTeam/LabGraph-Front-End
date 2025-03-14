import { LegendProps } from 'recharts'

export interface ListingItem {
  id: number
  name: string
  level_lot: string
  test_lot: string
  level: string
  sd: number
  mean: number
  ownMeanValue: number
  ownSdValue: number
  date: string
  value: number
  unit_value: string
  description: string
  rules?: string
}

export interface ListingCollection extends Array<any> {}

export interface UseFetchListingProps {
  url: string
  urlMeanAndDeviation: string
}

export interface GroupedListing {
  level: string
  values: ListingItem[]
}

export interface ControlChartProps {
  listing: ListingItem[]
}

export interface MeanStdDevValue {
  mean: number
  standardDeviation: number
}

export interface LevelGroupResponse {
  groupedValuesByLevelDTO: {
    level: string
    values: ListingItem[]
  }
  groupedMeanAndStdByLevelDTO: {
    level: string
    values: MeanStdDevValue[]
  }
}

export interface MeanAndDeviationDisplayProps {
  mean: number
  sd: number
  ownMean: number
  ownSd: number
  unitValue: string
}

export interface MeanAndSdResponse {
  level: string
  meanAndSd: {
    mean: number
    standardDeviation: number
  }
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

export interface MultipleLineChartProps {
  listings: LevelGroupResponse[]
  colors?: string[]
}

export interface LabGraphProps {
  testList: string[]
  analyticsType: string
  levelListSize: number
}

export interface MultipleLineGraphProps {
  levelListSize: number
  testList: string[]
  analyticsType: string
}

export interface ListingData {
  listing: any[]
  unitValue: string | null
  ownMean: number | null
  ownSd: number | null
}

export interface FetchListingData {
  calcMeanAndStdDTO: {
    mean: number
    standardDeviation: number
  }
  analyticsDTO: {
    unit_value?: string
  }[]
}

export interface PayloadData {
  date: string
  level: string
  levelLot: string
  name: string
  rawValue: number
  unitValue: string
  mean: number
  sd: number
}

export interface LegendCustomProps extends LegendProps {
  payload?: Array<{
    value: string
    payload: {
      level: string
      strokeDasharray: string | number
    }
  }>
  data?: Array<{
    level: string
  }>
}

export interface LegendMultipleProps {
  payload?: any[]
  levels: string[]
}

export type ViewMode = 'single' | 'dual'

export interface GraphContextType {
  viewMode: ViewMode
  toggleView: () => void
  setViewMode: (mode: ViewMode) => void
}

export interface StatItemProps {
  label: string
  value?: number
  formatter: (value: number) => string
}
