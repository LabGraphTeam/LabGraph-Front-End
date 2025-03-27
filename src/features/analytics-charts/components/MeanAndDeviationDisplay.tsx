import React from 'react'

import StatItem from '@/features/analytics-charts/components/StatItem'
import { calculateCV } from '@/features/analytics-charts/utils/calculateCv'
import formatWithUnit from '@/features/analytics-charts/utils/formatWithUnit'
import { MeanAndDeviationDisplayProps } from '@/types/Chart'

const MeanAndDeviationDisplay: React.FC<MeanAndDeviationDisplayProps> = ({
  mean,
  standardDeviation,
  ownMean,
  ownSd,
  unitValue
}) => {
  return (
    <div className='flex w-full flex-col text-textPrimary'>
      <StatItem formatStatValue={formatWithUnit} label='Mean' value={mean} unitValue={unitValue} />
      <StatItem
        formatStatValue={formatWithUnit}
        label='Standard Deviation'
        value={standardDeviation}
        unitValue={unitValue}
      />
      {ownMean !== undefined && ownSd !== undefined ? (
        <StatItem
          formatStatValue={() => `${calculateCV(ownMean, ownSd)} (%)`}
          label='Calculated CV'
          value={ownMean}
          unitValue={unitValue}
        />
      ) : null}
    </div>
  )
}

export default MeanAndDeviationDisplay
