import PageButtons from '@/features/analytics-table/components/PageButtons'
import Arrow from '@/shared/ui/arrow-button'
import { AnalyticsPaginationProps } from '@/types/AnalyticsTable'
import React from 'react'

const AnalyticsPagination: React.FC<AnalyticsPaginationProps> = ({
  currentPage,
  totalPages,
  analyticsData,
  setCurrentPage
}) => {
  return (
    <div className='mb-10 flex w-full flex-col items-center bg-background py-4'>
      <div className='flex w-full items-center justify-center space-x-0'>
        <button
          aria-label='Go to previous page'
          className='rounded-md px-4 py-2 text-xs text-textPrimary transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <span className='flex flex-row items-center'>
            <Arrow direction='left' />
            Previous
          </span>
        </button>
        <div className='flex items-center'>
          <PageButtons
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
        </div>
        <button
          className='rounded-md px-4 py-2 text-xs text-textPrimary transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
          disabled={
            totalPages !== undefined
              ? currentPage === totalPages - 1 || analyticsData.length === 0
              : analyticsData.length === 0
          }
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <span className='flex flex-row items-center'>
            Next
            <Arrow direction='right' />
          </span>
        </button>
      </div>
    </div>
  )
}

export default AnalyticsPagination
