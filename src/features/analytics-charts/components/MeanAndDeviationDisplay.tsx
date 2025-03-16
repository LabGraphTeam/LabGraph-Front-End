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
    <div className='grid w-full grid-cols-1 text-xs font-light text-textPrimary md:ml-8 md:grid-cols-3'>
      <StatItem label='Mean (Reference)' value={mean} formatter={formatWithUnit} />
      <StatItem label='Deviation (Reference)' value={sd} formatter={formatWithUnit} />
      <StatItem label='Calculated Mean' value={ownMean} formatter={formatWithUnit} />
      <StatItem label='Calculated Deviation' value={ownSd} formatter={formatWithUnit} />
      {ownMean !== undefined && ownSd !== undefined && (
        <StatItem
          label='Calculated CV'
          value={ownMean}
          formatter={() => `${calculateCV(ownMean, ownSd)} (%)`}
        />
      )}
    </div>
  )
}

export default React.memo(MeanAndDeviationDisplay)
