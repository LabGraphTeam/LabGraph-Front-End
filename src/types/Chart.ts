import { LegendProps } from 'recharts'

export interface AnalyticItem {
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
  rules: string
}

export interface MeanStdDevValueData {
  mean: number
  standardDeviation: number
}

export interface AnalyticGroupedData {
  groupedValuesByLevelDTO: {
    level: string
    values: AnalyticItem[]
  }
  groupedMeanAndStdByLevelDTO: {
    level: string
    values: MeanStdDevValueData[]
  }
}

export interface MeanAndDeviationDisplayProps {
  mean: number
  sd: number
  ownMean: number
  ownSd: number
  unitValue: string
}

export interface MultipleLineChartProps {
  analyticsListData: AnalyticGroupedData[]
  colors?: string[]
}

export interface SingleLineGraphProps {
  testList: string[]
  analyticsType: string
  levelListSize: number
}

export interface MultipleLineGraphProps {
  levelListSize: number
  testList: string[]
  analyticsType: string
}

export interface AnalyticWithStatsData {
  calcMeanAndStdDTO: {
    mean: number
    standardDeviation: number
  }
  analyticsDTO: AnalyticItem[]
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

export interface LegendCustomSingleLineProps extends LegendProps {
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

export interface LegendMultipleLinesProps {
  payload?: { color: string }[]
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

export interface MultipleLinesData {
  [key: string]: string | number | undefined
  date1?: string
  date2?: string
  level1?: string
  level2?: string
  value1?: number
  value2?: number
  rawValue1?: string | number
  rawValue2?: string | number
  levelLot1?: string
  levelLot2?: string
  name1?: string
  name2?: string
  mean1?: number
  mean2?: number
  sd1?: number
  sd2?: number
}
