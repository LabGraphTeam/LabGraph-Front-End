import { AnalyticsTableProps } from '@/types/AnalyticsTable'
import React from 'react'
import { tableHeaders } from '../constants/tableHeaders'
import TableRow from './AnalyticsTableRow'
import MobileItemCard from './MobileItemCard'

const AnalyticsTable: React.FC<AnalyticsTableProps> = ({
  items,
  onValidate,
  onUpdateDescription
}) => {
  return (
    <>
      <table className='hidden rounded-md border border-borderColor bg-surface p-8 shadow-md shadow-shadow md:table md:w-full'>
        <caption className='mb-1 text-[10px] text-primary'>
          Table 1.1: Interactive Analytics Results with Filtering Options
        </caption>
        <thead className='rounded-lg bg-muted'>
          <tr className=''>
            {tableHeaders.map((header) => (
              <th
                key={header.id}
                className='border-b border-border px-2 py-1 text-left text-[8px] font-semibold uppercase tracking-wider text-textSecondary md:text-[9px]'
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              analyticData={item}
              onValidate={onValidate}
              onUpdateDescription={onUpdateDescription}
            />
          ))}
        </tbody>
      </table>
      <div className='mt-2 grid grid-cols-3 place-content-center gap-2 px-2 text-center md:hidden'>
        {items.map((item) => (
          <MobileItemCard key={item.id} analyticData={item} />
        ))}
      </div>
    </>
  )
}

export default AnalyticsTable
