import { MeanAndDeviationDisplayProps } from '@/types/Chart'
import React from 'react'
import { calculateCV } from '../utils/calculateCv'
import StatItem from './StatItem'

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
      <StatItem label='Mean (Reference)' value={mean} formatStatValue={formatWithUnit} />
      <StatItem label='Deviation (Reference)' value={sd} formatStatValue={formatWithUnit} />
      <StatItem label='Calculated Mean' value={ownMean} formatStatValue={formatWithUnit} />
      <StatItem label='Calculated Deviation' value={ownSd} formatStatValue={formatWithUnit} />
      {ownMean !== undefined && ownSd !== undefined && (
        <StatItem
          label='Calculated CV'
          value={ownMean}
          formatStatValue={() => `${calculateCV(ownMean, ownSd)} (%)`}
        />
      )}
    </div>
  )
}

export default React.memo(MeanAndDeviationDisplay)
