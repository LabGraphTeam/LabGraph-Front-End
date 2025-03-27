import { LegendProps } from 'recharts'

export interface AnalyticData {
  id: number
  name: string
  level_lot: string
  test_lot: string
  level: string
  sd: number
  mean: number
  date: string
  value: number
  unit_value: string
  description: string
  rules: string
}

export interface ChartEntry {
  date?: string
  [key: `value${number}`]: number
  [key: `date${number}`]: string
  [key: `level${number}`]: string
  [key: `rawValue${number}`]: string
  [key: `levelLot${number}`]: string
  [key: `name${number}`]: string
  [key: `description${number}`]: string
  [key: `rules${number}`]: string
  [key: `mean${number}`]: number
  [key: `sd${number}`]: number
  [key: `unit${number}`]: string
}

export interface MeanStdDevValueData {
  mean: number
  standardDeviation: number
}

export interface GroupedAnalyticData {
  groupedValuesByLevelDTO: {
    level: string
    values: AnalyticData[]
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
  groupedAnalysisData: GroupedAnalyticData[]
}

export interface SingleLineGraphProps {
  testList: string[]
  analyticsType: string
  size: number
}

export interface MultipleLineGraphProps {
  testList: string[]
  analyticsType: string
}

export interface AnalyticWithStatsData {
  calcMeanAndStdDTO: {
    mean: number
    standardDeviation: number
  }
  analyticsDTO: AnalyticData[]
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
  ownMean: number
  ownSd: number
}

export interface LegendCustomSingleLineProps extends LegendProps {
  payload?: Array<{
    value: string
    payload: {
      level: string
      strokeDasharray: string | number
    }
  }>
  levelData?: Array<{
    dataLevel: string
  }>
}

export interface LegendMultipleLinesProps {
  payload?: { color: string }[]
  multipleLineLevels: string[]
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
  unitValue: string
  formatStatValue: (value: number, unitValue: string) => string
}
