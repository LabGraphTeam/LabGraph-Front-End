import { MobileItemCardProps } from '@/types/AnalyticsTable'
import React from 'react'

const MobileItemCard: React.FC<MobileItemCardProps> = ({ analyticItem: item }) => {
  return (
    <div className='mt-6 rounded-md border border-border bg-surface p-4 shadow-sm shadow-shadow'>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Test: <span className='text-textPrimary'>{item.name}</span>
      </p>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Level: <span className='text-textPrimary'>{item.level}</span>
      </p>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Standard Deviation: <span className='text-textPrimary'>{item.sd.toFixed(2)}</span>
      </p>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Mean: <span className='text-textPrimary'>{item.mean.toFixed(2)}</span>
      </p>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Date: <span className='text-textPrimary'>{item.date}</span>
      </p>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Values: <span className='text-textPrimary'>{item.value.toFixed(2)}</span>
      </p>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Unit: <span className='text-textPrimary'>{item.unit_value}</span>
      </p>
      <p className='text-[6px] font-semibold text-textSecondary'>
        Rules: <span className='text-textPrimary'>{item.rules}</span>
      </p>
    </div>
  )
}

export default MobileItemCard
