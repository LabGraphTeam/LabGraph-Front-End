import LegendCustom from '@/features/analytics-charts/single-line/components/LegendCustom'
import TooltipCustom from '@/features/analytics-charts/single-line/components/TooltipCustom'
import getColorByLevel from '@/features/analytics-charts/utils/getColorByLevel'
import normalizeValue from '@/features/analytics-charts/utils/normalizeValue'
import returnFullNameByTest from '@/features/analytics-charts/utils/returnFullNameByTest'
import useWindowDimensions from '@/shared/hooks/useWindowDimensions'
import customFormatDate from '@/shared/ui/date-selectors/constants/customFormatDate'
import { AnalyticWithStatsData } from '@/types/Chart'
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
  XAxis,
  YAxis
} from 'recharts'

const ControlChart: React.FC<AnalyticWithStatsData> = ({
  analyticsDTO: listingData,
  calcMeanAndStdDTO
}) => {
  const [useOwnValues, setUseOwnValues] = useState(false)

  const toggleUseOwnValues = useCallback(() => {
    setUseOwnValues((prev) => !prev)
  }, [])

  const { width: windowWidth } = useWindowDimensions()

  const chartData = listingData.map((entry) => ({
    key: entry.id,
    date: customFormatDate(entry.date),
    levelLot: entry.level_lot,
    level: entry.level,
    name: entry.name,
    value: normalizeValue(
      entry.value,
      useOwnValues ? calcMeanAndStdDTO.mean : entry.mean,
      useOwnValues ? calcMeanAndStdDTO.standardDeviation : entry.sd
    ),

    unitValue: entry.unit_value,
    rawValue: entry.value,
    sd: useOwnValues ? calcMeanAndStdDTO.standardDeviation : entry.sd,
    mean: useOwnValues ? calcMeanAndStdDTO.mean : entry.mean,
    ownSd: calcMeanAndStdDTO.standardDeviation,
    ownMean: calcMeanAndStdDTO.mean,
    description: entry.description,
    rules: entry.rules
  }))

  const yAxisValues = useMemo(
    () => [
      { value: -3, label: '-3s', color: 'var(--color-sd3)' },
      { value: -2, label: '-2s', color: 'var(--color-sd2)' },
      { value: -1, label: '-1s', color: 'var(--color-sd1)' },
      { value: 0, label: 'Mean', color: 'var(--color-mean-line)' },
      { value: 1, label: '+1s', color: 'var(--color-sd1)' },
      { value: 2, label: '+2s', color: 'var(--color-sd2)' },
      { value: 3, label: '+3s', color: 'var(--color-sd3)' }
    ],
    []
  )

  return (
    <div className='mb-2 min-h-min w-[98%] md:w-[90%]'>
      <div className='rounded-2xl border border-borderColor bg-surface shadow-md shadow-shadow'>
        <div className='relative flex flex-col items-center'>
          <h2 className='mt-4 flex place-content-center items-center text-[9px] italic text-textSecondary md:text-2xl'>
            {returnFullNameByTest(listingData[0].name) +
              ' (Level - ' +
              listingData[0].level.toUpperCase() +
              ')'}
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
        <div className='flex h-[225px] place-content-center items-center md:min-h-[250px] xl:min-h-[250px] 2xl:min-h-[325px] 3xl:min-h-[500px]'>
          <ResponsiveContainer
            className='flex place-content-center items-center bg-surface'
            height='96%'
            width='97%'
          >
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
                  color: getColorByLevel(listingData[0].level.toString()),
                  r: 3
                }}
                animationDuration={250}
                connectNulls={true}
                dataKey="value"
                dot={{
                  fill: getColorByLevel(listingData[0].level.toString()),
                  stroke: getColorByLevel(listingData[0].level.toString()),
                  r: 2,
                  strokeWidth: 1,
                  className: 'text-textPrimary'
                }}
                id="id"
                name="level"
                stroke={getColorByLevel(listingData[0].level.toString())}
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
