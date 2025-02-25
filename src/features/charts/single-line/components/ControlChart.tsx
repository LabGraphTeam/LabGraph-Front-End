import useWindowDimensions from '@/features/shared/ui/hooks/useWindowDimensions';
import returnFullNameByTest from '@/features/shared/utils/helpers/returnFullNameByTest';
import React, { useCallback, useMemo, useState } from 'react';
import { TbFileDescription, TbMathFunction } from 'react-icons/tb';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import customFormatDate from '../../../shared/date-selector/constants/customFormatDate';
import getColorByLevel from '../../constants/getColorByLevel';
import normalizeValue from '../../constants/normalizeValue';
import { ControlChartProps } from '../../types/Chart';
import LegendCustom from './LegendCustom';
import TooltipCustom from './TooltipCustom';

const ControlChart: React.FC<ControlChartProps> = ({ listing: listingData }) => {
  const [useOwnValues, setUseOwnValues] = useState(false);

  const toggleUseOwnValues = useCallback(() => {
    setUseOwnValues((prev) => !prev);
  }, []);

  const { width: windowWidth } = useWindowDimensions();

  const chartData = listingData.map((entry) => ({
    key: entry.id,
    date: customFormatDate(entry.date),
    levelLot: entry.level_lot,
    level: entry.level,
    name: entry.name,
    value: normalizeValue(
      entry.value,
      useOwnValues ? entry.ownMeanValue : entry.mean,
      useOwnValues ? entry.ownSdValue : entry.sd
    ),

    unitValue: entry.unit_value,
    rawValue: entry.value,
    sd: useOwnValues ? entry.ownSdValue : entry.sd,
    mean: useOwnValues ? entry.ownMeanValue : entry.mean,
    OwnSd: entry.ownSdValue,
    OwnMean: entry.ownMeanValue,
    description: entry.description,
    rules: entry.rules,
  }));

  const yAxisValues = useMemo(
    () => [
      { value: -3, label: '-3s', color: 'var(--color-sd3)' },
      { value: -2, label: '-2s', color: 'var(--color-sd2)' },
      { value: -1, label: '-1s', color: 'var(--color-sd1)' },
      { value: 0, label: 'Mean', color: 'var(--color-mean-line)' },
      { value: 1, label: '+1s', color: 'var(--color-sd1)' },
      { value: 2, label: '+2s', color: 'var(--color-sd2)' },
      { value: 3, label: '+3s', color: 'var(--color-sd3)' },
    ],
    []
  );

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
              onClick={toggleUseOwnValues}
              className='group flex flex-col items-center transition-all duration-300'
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
        <div className='flex h-[250px] place-content-center items-center md:min-h-[300px] xl:min-h-[300px] 2xl:min-h-[350px] 3xl:min-h-[550px]'>
          <ResponsiveContainer
            className='flex place-content-center items-center bg-surface'
            width='97%'
            height='96%'
          >
            <LineChart data={chartData} margin={{}}>
              <CartesianGrid stroke='false' />
              <XAxis
                className='text-[0.4rem] text-textPrimary md:text-[0.7rem]'
                id='key'
                dataKey='date'
                angle={-50}
                textAnchor='end'
                tickFormatter={(date) => date}
                height={windowWidth < 768 ? 35 : 60}
                width={windowWidth < 768 ? 35 : 40}
                tickMargin={0}
                axisLine={false}
                tickLine={false}
                stroke='var(--color-text-primary)'
              />
              <YAxis
                className='text-[0.5rem] text-textPrimary md:text-xs'
                domain={[0 - 3.5 * 1, 0 + 3.5 * 1]}
                textAnchor='end'
                ticks={yAxisValues.map((v) => v.value)}
                width={windowWidth < 768 ? 30 : 40}
                height={0}
                tickMargin={0}
                axisLine={false}
                tickLine={false}
                stroke='var(--color-text-primary)'
                tickFormatter={(value) => {
                  const matchingValue = yAxisValues.find((v) => Math.abs(v.value - value) < 0.0001);
                  return matchingValue ? matchingValue.label : '';
                }}
              />
              <Tooltip content={TooltipCustom} />
              <Line
                id={'id'}
                type='linear'
                dataKey={`value`}
                name={`level`}
                stroke={getColorByLevel(listingData[0].level.toString())}
                strokeWidth={1.0}
                connectNulls={true}
                activeDot={{
                  color: getColorByLevel(listingData[0].level.toString()),
                  r: 3,
                }}
                dot={{
                  fill: getColorByLevel(listingData[0].level.toString()),
                  stroke: getColorByLevel(listingData[0].level.toString()),
                  r: 2,
                  strokeWidth: 1,
                  className: 'text-textPrimary',
                }}
                animationDuration={250}
              />
              {yAxisValues.map((line) => (
                <ReferenceLine
                  key={line.value}
                  y={line.value}
                  stroke={line.color}
                  strokeDasharray='4 4'
                  strokeWidth={1.0}
                  strokeOpacity={1.0}
                />
              ))}
              <Legend
                content={<LegendCustom />}
                verticalAlign='bottom'
                wrapperStyle={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  fontStyle: 'italic',
                  fontSize: 'x-small',
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ControlChart;
