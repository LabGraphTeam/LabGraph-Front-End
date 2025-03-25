import StatItem from '@/features/analytics-charts/components/StatItem'
import { calculateCV } from '@/features/analytics-charts/utils/calculateCv'
import { MeanAndDeviationDisplayProps } from '@/types/Chart'
import React from 'react'

const MeanAndDeviationDisplay: React.FC<MeanAndDeviationDisplayProps> = ({
  mean,
  sd,
  ownMean,
  ownSd,
  unitValue
}) => {
  const formatWithUnit = React.useCallback(
    (value: number) => value.toFixed(2) + (unitValue ? ' (' + unitValue + ')' : ''),
    [unitValue]
  )

  return (
    <div className='flex w-full flex-col text-[10px] font-light text-textPrimary'>
      <StatItem formatStatValue={formatWithUnit} label='Mean (Reference)' value={mean} />
      <StatItem formatStatValue={formatWithUnit} label='Deviation (Reference)' value={sd} />
      <StatItem formatStatValue={formatWithUnit} label='Calculated Mean' value={ownMean} />
      <StatItem formatStatValue={formatWithUnit} label='Calculated Deviation' value={ownSd} />
      {ownMean !== undefined && ownSd !== undefined ? <StatItem
          formatStatValue={() => `${calculateCV(ownMean, ownSd)} (%)`}
          label='Calculated CV'
          value={ownMean}
        /> : null}
    </div>
  )
}

export default React.memo(MeanAndDeviationDisplay)
