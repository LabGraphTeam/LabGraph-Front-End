import React from 'react'

import StatItem from '@/features/analytics-charts/components/StatItem'
import calculateCV from '@/features/analytics-charts/utils/calculateCv'
import formatWithUnit from '@/features/analytics-charts/utils/formatWithUnit'
import { MeanAndDeviationDisplayProps } from '@/types/Chart'

const MeanAndDeviationDisplay: React.FC<MeanAndDeviationDisplayProps> = ({
  ownMean,
  ownSd,
  mean,
  sd,
  unitValue
}) => {
  return (
    <div className='flex w-full flex-col text-textPrimary'>
      <StatItem formatStatValue={formatWithUnit} label='Mean' value={mean} unitValue={unitValue} />
      <StatItem formatStatValue={() => formatWithUnit(sd, unitValue)} label='Standard Deviation' />
      <StatItem
        formatStatValue={() => formatWithUnit(calculateCV(ownMean, ownSd), '%')}
        label='Calculated CV'
      />
    </div>
  )
}

export default MeanAndDeviationDisplay
