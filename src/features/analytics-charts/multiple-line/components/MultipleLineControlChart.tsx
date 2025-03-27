import React, { useCallback, useMemo, useState } from 'react'
import { TbFileDescription, TbMathFunction } from 'react-icons/tb'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from 'recharts'

import { yAxisValues } from '@/features/analytics-charts/constants/yAxisValues'
import LegendMultiple from '@/features/analytics-charts/multiple-line/components/LegendMultiple'
import TooltipMultiple from '@/features/analytics-charts/multiple-line/components/TooltipMultiple'
import normalizeValue from '@/features/analytics-charts/utils/normalizeValue'
import returnFullNameByTest from '@/features/analytics-charts/utils/returnFullNameByTest'
import useWindowDimensions from '@/shared/hooks/useWindowDimensions'
import customFormatDate from '@/shared/ui/date-selectors/constants/customFormatDate'
import { ChartEntry, MeanStdDevValueData, MultipleLineChartProps } from '@/types/Chart'

const MultipleLineControlChart: React.FC<MultipleLineChartProps> = ({
  groupedAnalysisData: listings
}) => {
  const [useOwnValues, setUseOwnValues] = useState(false)
  const toggleUseOwnValues = useCallback(() => setUseOwnValues((prev) => !prev), [])
  const { windowWidth } = useWindowDimensions()

  const lineColors = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-secondary)']

  const levels = useMemo(() => {
    if (!listings || listings.length === 0) return []
    return listings.map((level) => level.groupedValuesByLevelDTO.level)
  }, [listings])

  const chartData = useMemo(() => {
    if (!listings || listings.length === 0) return []

    const maxLength = Math.max(
      ...listings.map((level) => level.groupedValuesByLevelDTO.values.length)
    )

    return Array.from({ length: maxLength }).map((_, index) => {
      const entry = {} as ChartEntry

      for (let levelIndex = 0; levelIndex < listings.length; levelIndex++) {
        const data = listings[levelIndex]
        const values = data.groupedValuesByLevelDTO.values[index]
        const ownMean = data.groupedMeanAndStdByLevelDTO.values[0].mean
        const ownSd = data.groupedMeanAndStdByLevelDTO.values[0].standardDeviation

        if (values) {
          const { mean, standardDeviation }: MeanStdDevValueData = useOwnValues
            ? { mean: ownMean, standardDeviation: ownSd }
            : {
                mean: values.mean,
                standardDeviation: values.sd
              }

          entry.date = customFormatDate(values.date)

          const levelNum = levelIndex + 1

          entry[`value${levelNum}`] = normalizeValue(values.value, mean, standardDeviation)
          entry[`date${levelNum}`] = customFormatDate(values.date)
          entry[`level${levelNum}`] = values.level
          entry[`rawValue${levelNum}`] = values.value.toFixed(2)
          entry[`levelLot${levelNum}`] = values.level_lot
          entry[`name${levelNum}`] = values.name
          entry[`description${levelNum}`] = values.description
          entry[`rules${levelNum}`] = values.rules ?? ''
          entry[`mean${levelNum}`] = useOwnValues ? ownMean : mean
          entry[`sd${levelNum}`] = useOwnValues ? ownSd : standardDeviation
          entry[`unit${levelNum}`] = values.unit_value
        }
      }

      return entry
    })
  }, [listings, useOwnValues])

  if (!listings || listings.length === 0) return null

  return (
    <div className='mb-2 min-h-min w-[98%] md:w-[90%]'>
      <div className='rounded-2xl border border-borderColor bg-surface shadow-md shadow-shadow'>
        <div className='relative flex flex-col items-center'>
          <h2 className='mt-4 flex place-content-center items-center text-[9px] italic text-textSecondary md:text-2xl'>
            {returnFullNameByTest(listings[0].groupedValuesByLevelDTO.values[0].name)}
          </h2>
          <div className='absolute right-1 top-1/2 -translate-y-1/2'>
            <button
              className='group flex flex-col items-center transition-all duration-300'
              onClick={toggleUseOwnValues}
            >
              <div
                className={`rounded-full p-2 transition-all duration-300 ${
                  useOwnValues
                    ? 'hover:bg-textPrimary/20 text-textPrimary'
                    : 'hover:bg-textSecondary/20 text-textSecondary'
                }`}
              >
                {useOwnValues ? (
                  <TbMathFunction className='size-3 md:size-5' />
                ) : (
                  <TbFileDescription className='size-3 md:size-5' />
                )}
              </div>
              <span
                className={`text-[6px] font-medium md:text-xs ${useOwnValues ? 'text-textPrimary' : 'text-textSecondary'}`}
              >
                {useOwnValues ? 'Calculated' : 'Reference Value'}
              </span>
            </button>
          </div>
        </div>

        <div className='flex h-[225px] place-content-center items-center md:min-h-[300px] xl:min-h-[300px] 2xl:min-h-[350px] 3xl:min-h-[500px]'>
          <ResponsiveContainer
            className='flex place-content-center items-center bg-surface'
            height='96%'
            width='97%'
          >
            <LineChart data={chartData} margin={{}}>
              <CartesianGrid stroke='false' />
              <YAxis
                axisLine={false}
                className='text-[0.5rem] text-textPrimary md:text-xs'
                dataKey='sd'
                domain={[0 - 3.5 * 1, 0 + 3.5 * 1]}
                height={windowWidth < 768 ? 35 : 60}
                stroke='var(--color-text-primary)'
                textAnchor='end'
                tickFormatter={(value) => {
                  const matchingValue = yAxisValues.find((v) => Math.abs(v.value - value) < 0.0001)
                  return matchingValue ? matchingValue.label : ''
                }}
                tickLine={false}
                tickMargin={0}
                ticks={yAxisValues.map((v) => v.value)}
                width={windowWidth < 768 ? 35 : 40}
              />
              <Tooltip content={<TooltipMultiple />} />
              {listings.map((_, index) => (
                <Line
                  activeDot={{
                    color: lineColors[index],
                    r: 3
                  }}
                  animationDuration={250}
                  connectNulls={true}
                  dataKey={`value${index + 1}`}
                  dot={{
                    fill: lineColors[index],
                    stroke: lineColors[index],
                    r: 2,
                    strokeWidth: 1,
                    className: 'text-textPrimary'
                  }}
                  key={listings[index].groupedValuesByLevelDTO.level}
                  name={`Nível ${index}`}
                  stroke={lineColors[index]}
                  strokeWidth={1.0}
                  type='linear'
                />
              ))}
              {yAxisValues.map((line) => (
                <ReferenceLine
                  key={line.value}
                  stroke={line.color}
                  strokeDasharray='5 5'
                  strokeOpacity={1.0}
                  strokeWidth={1.0}
                  y={line.value}
                />
              ))}
              <Legend
                content={<LegendMultiple multipleLineLevels={levels} />}
                verticalAlign='bottom'
                wrapperStyle={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  fontStyle: 'italic',
                  fontSize: 'x-small'
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default MultipleLineControlChart
