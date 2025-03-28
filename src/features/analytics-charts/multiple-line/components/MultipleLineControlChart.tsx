import React, { useMemo, useState } from 'react'
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

import OwnStatisticsButton from '@/features/analytics-charts/components/OwnStatisticValuesButton'
import { yAxisValues } from '@/features/analytics-charts/constants/yAxisValues'
import LegendMultiple from '@/features/analytics-charts/multiple-line/components/LegendMultiple'
import TooltipMultiple from '@/features/analytics-charts/multiple-line/components/TooltipMultiple'
import normalizeValue from '@/features/analytics-charts/utils/normalizeValue'
import returnFullNameByTest from '@/features/analytics-charts/utils/returnFullNameByTest'
import useWindowDimensions from '@/shared/hooks/useWindowDimensions'
import customFormatDate from '@/shared/ui/date-selectors/constants/customFormatDate'
import { ChartEntry, MultipleLineChartProps } from '@/types/Chart'

const MultipleLineControlChart: React.FC<MultipleLineChartProps> = ({ groupedAnalysisData }) => {
  const [isOwnStatisticValues, setIsOwnStatisticValues] = useState(false)
  const { windowWidth } = useWindowDimensions()

  const lineColors = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-secondary)']
  const levels = groupedAnalysisData.map((level) => level.groupedValuesByLevelDTO.level)

  const chartData = useMemo(() => {
    const maxLength = Math.max(
      ...groupedAnalysisData.map((level) => level.groupedValuesByLevelDTO.values.length)
    )

    return Array.from({ length: maxLength }).map((_, index) => {
      const entry = {} as ChartEntry

      groupedAnalysisData.forEach((data, levelIndex) => {
        const values = data.groupedValuesByLevelDTO.values[index]
        if (!values) return

        const ownMean = data.groupedMeanAndStdByLevelDTO.values[0].mean
        const ownSd = data.groupedMeanAndStdByLevelDTO.values[0].standardDeviation
        const levelNum = levelIndex + 1

        const mean = isOwnStatisticValues ? ownMean : values.mean
        const standardDeviation = isOwnStatisticValues ? ownSd : values.sd

        entry.date = customFormatDate(values.date)

        entry[`value${levelNum}`] = normalizeValue(values.value, mean, standardDeviation)
        entry[`date${levelNum}`] = customFormatDate(values.date)
        entry[`level${levelNum}`] = values.level
        entry[`rawValue${levelNum}`] = values.value.toFixed(2)
        entry[`levelLot${levelNum}`] = values.level_lot
        entry[`name${levelNum}`] = values.name
        entry[`description${levelNum}`] = values.description
        entry[`rules${levelNum}`] = values.rules ?? ''
        entry[`mean${levelNum}`] = mean
        entry[`sd${levelNum}`] = standardDeviation
        entry[`unit${levelNum}`] = values.unit_value
      })

      return entry
    })
  }, [groupedAnalysisData, isOwnStatisticValues])

  return (
    <div className='mb-2 w-[98%] grow md:w-[98%]'>
      <div className='rounded-2xl border border-borderColor bg-surface shadow-md shadow-shadow'>
        <div className='relative flex flex-col items-center'>
          <h3 className='mt-4 flex place-content-center items-center text-[9px] italic text-textSecondary md:text-2xl'>
            {returnFullNameByTest(groupedAnalysisData[0].groupedValuesByLevelDTO.values[0].name)}
          </h3>
          <span className='absolute right-2 top-1/2 -translate-y-1/2'>
            <OwnStatisticsButton
              isOwnStatisticValues={isOwnStatisticValues}
              setIsOwnStatisticValues={setIsOwnStatisticValues}
            />
          </span>
        </div>

        <div className='flex h-[250px] place-content-center items-center md:min-h-[250px] xl:min-h-[250px] 2xl:min-h-[325px] 3xl:min-h-[525px] 4xl:min-h-[625px]'>
          <ResponsiveContainer className='flex items-center bg-surface' height='97%' width='97%'>
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
              {groupedAnalysisData.map((_, index) => (
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
                  key={groupedAnalysisData[index].groupedValuesByLevelDTO.level}
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
