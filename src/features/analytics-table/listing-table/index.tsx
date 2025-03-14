import Loading from '@/features/shared/utils/components/loading'
import React from 'react'
import { ListingTableProps } from '../../miscs/types/ListiningTable'
import MobileItemCard from '../components/MobileItemCard'
import TableRow from '../components/TableRow'

const tableHeaders = [
  { id: 'date', name: 'Date' },
  { id: 'test', name: 'Test' },
  { id: 'level_test', name: 'Level Test' },
  { id: 'lot_number', name: 'Lot Number' },
  { id: 'standard_deviation', name: 'Standard Deviation' },
  { id: 'mean_test', name: 'Mean Test' },
  { id: 'values', name: 'Values' },
  { id: 'unit', name: 'Unit' },
  { id: 'rules', name: 'Rules' }
]

const ListingTable: React.FC<ListingTableProps> = ({ items, isLoading }) => {
  return (
    <div className='flex h-min w-full flex-col justify-evenly '>
      <table className='hidden rounded-md bg-surface shadow-md shadow-shadow md:table'>
        <thead className='rounded-lg bg-muted'>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header.id}
                className='border-b border-border px-2 py-1 text-left text-[10px] font-semibold uppercase tracking-wider text-textSecondary md:text-xs'
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <TableRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
      <div className='grid grid-cols-4 place-content-center gap-2 px-2 text-center md:hidden'>
        {items.map((item) => (
          <MobileItemCard key={item.id} item={item} />
        ))}
      </div>
      {isLoading ? (
        <div className=' rounded-md py-2 text-center text-textSecondary md:shadow-md md:shadow-shadow'>
          <Loading />
        </div>
      ) : null}
    </div>
  )
}

export default ListingTable
