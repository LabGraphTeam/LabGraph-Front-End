import TableRow from '@/features/analytics-table/components/AnalyticsTableRow'
import MobileItemCard from '@/features/analytics-table/components/MobileItemCard'
import { tableHeaders } from '@/features/analytics-table/constants/tableHeaders'
import { AnalyticsTableProps } from '@/types/AnalyticsTable'
import React from 'react'

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
                className='border-b border-border px-2 py-1 text-left text-[8px] font-semibold uppercase tracking-wider text-textSecondary md:text-[9px]'
                key={header.id}
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <TableRow
              analyticData={item}
              key={item.id}
              onUpdateDescription={onUpdateDescription}
              onValidate={onValidate}
            />
          ))}
        </tbody>
      </table>
      <div className='mt-2 grid grid-cols-3 place-content-center gap-2 px-2 text-center md:hidden'>
        {items.map((item) => (
          <MobileItemCard analyticData={item} key={item.id} />
        ))}
      </div>
    </>
  )
}

export default AnalyticsTable
