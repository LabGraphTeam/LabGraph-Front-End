import React, { useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import OwnStatisticsButton from '@/features/analytics-charts/components/OwnStatisticValuesButton'
import { yAxisValues } from '@/features/analytics-charts/constants/yAxisValues'
import LegendCustom from '@/features/analytics-charts/single-line/components/LegendCustom'
import TooltipCustom from '@/features/analytics-charts/single-line/components/TooltipCustom'
import getColorByLevel from '@/features/analytics-charts/utils/getColorByLevel'
import normalizeValue from '@/features/analytics-charts/utils/normalizeValue'
import returnFullNameByTest from '@/features/analytics-charts/utils/returnFullNameByTest'
import useWindowDimensions from '@/shared/hooks/useWindowDimensions'
import customFormatDate from '@/shared/ui/date-selectors/constants/customFormatDate'
import { AnalyticWithStatsData } from '@/types/Chart'

const ControlChart: React.FC<AnalyticWithStatsData> = ({
  analyticsDTO: analyticsData = [],
  calcMeanAndStdDTO: statisticsData = {
    mean: 0,
    standardDeviation: 0
  }
}) => {
  const [isOwnStatisticsValues, setIsOwnStatisticsValues] = useState(false)

  const { windowWidth } = useWindowDimensions()

  const chartData = analyticsData.map((entry) => ({
    key: entry.id,
    date: customFormatDate(entry.date),
    levelLot: entry.level_lot,
    level: entry.level,
    name: entry.name,
    value: normalizeValue(
      entry.value,
      isOwnStatisticsValues ? statisticsData.mean : entry.mean,
      isOwnStatisticsValues ? statisticsData.standardDeviation : entry.sd
    ),
    unitValue: entry.unit_value,
    rawValue: entry.value,
    sd: isOwnStatisticsValues ? statisticsData.standardDeviation : entry.sd,
    mean: isOwnStatisticsValues ? statisticsData.mean : entry.mean,
    ownSd: statisticsData.standardDeviation,
    ownMean: statisticsData.mean,
    description: entry.description,
    rules: entry.rules
  }))

  return (
    <div className='mb-2 w-[98%] grow md:w-[98%]'>
      <div className='rounded-2xl border border-borderColor bg-surface shadow-md shadow-shadow'>
        <div className='relative flex flex-col items-center'>
          <h3 className='mt-4 flex place-content-center items-center text-[9px] italic text-textSecondary md:text-2xl'>
            {returnFullNameByTest(analyticsData[0].name) +
              ' (Level - ' +
              analyticsData[0].level.toUpperCase() +
              ')'}
          </h3>
          <span className='absolute right-2 top-1/2 -translate-y-1/2'>
            <OwnStatisticsButton
              isOwnStatisticValues={isOwnStatisticsValues}
              setIsOwnStatisticValues={setIsOwnStatisticsValues}
            />
          </span>
        </div>
        <div className='flex h-[250px] place-content-center items-center md:min-h-[250px] xl:min-h-[250px] 2xl:min-h-[325px] 3xl:min-h-[525px] 4xl:min-h-[625px]'>
          <ResponsiveContainer className='flex items-center bg-surface' height='97%' width='97%'>
            <LineChart data={chartData} margin={{}}>
              <CartesianGrid stroke='false' />
              <XAxis
                angle={-50}
                axisLine={false}
                className='text-[0.4rem] text-textPrimary md:text-[0.7rem]'
                dataKey='date'
                height={windowWidth < 768 ? 35 : 60}
                id='key'
                stroke='var(--color-text-primary)'
                textAnchor='end'
                tickFormatter={(date) => date}
                tickLine={false}
                tickMargin={0}
                width={windowWidth < 768 ? 35 : 40}
              />
              <YAxis
                axisLine={false}
                className='text-[0.5rem] text-textPrimary md:text-xs'
                domain={[0 - 3.5 * 1, 0 + 3.5 * 1]}
                height={0}
                stroke='var(--color-text-primary)'
                textAnchor='end'
                tickFormatter={(value) => {
                  const matchingValue = yAxisValues.find((v) => Math.abs(v.value - value) < 0.0001)
                  return matchingValue ? matchingValue.label : ''
                }}
                tickLine={false}
                tickMargin={0}
                ticks={yAxisValues.map((v) => v.value)}
                width={windowWidth < 768 ? 30 : 40}
              />
              <Tooltip content={TooltipCustom} />
              <Line
                activeDot={{
                  color: getColorByLevel(analyticsData[0].level.toString()),
                  r: 3
                }}
                animationDuration={250}
                connectNulls={true}
                dataKey='value'
                dot={{
                  fill: getColorByLevel(analyticsData[0].level.toString()),
                  stroke: getColorByLevel(analyticsData[0].level.toString()),
                  r: 2,
                  strokeWidth: 1,
                  className: 'text-textPrimary'
                }}
                id='id'
                name='level'
                stroke={getColorByLevel(analyticsData[0].level.toString())}
                strokeWidth={1.0}
                type='linear'
              />
              {yAxisValues.map((line) => (
                <ReferenceLine
                  key={line.value}
                  stroke={line.color}
                  strokeDasharray='4 4'
                  strokeOpacity={1.0}
                  strokeWidth={1.0}
                  y={line.value}
                />
              ))}
              <Legend
                content={<LegendCustom />}
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

export default ControlChart
