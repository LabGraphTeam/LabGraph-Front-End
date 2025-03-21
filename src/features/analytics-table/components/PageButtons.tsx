import { PageButtonsProps } from '@/types/AnalyticsTable'
import React, { useState } from 'react'

const PageButtons: React.FC<PageButtonsProps> = ({ totalPages, currentPage, setCurrentPage }) => {
  const [showAllPages, setShowAllPages] = useState(false)

  if (totalPages === undefined) return null

  const pages: (number | 'ellipsis')[] = []
  if (showAllPages || totalPages <= 4) {
    for (let i = 0; i < totalPages; i++) {
      pages.push(i)
    }
  } else {
    for (let i = 0; i < 3; i++) {
      pages.push(i)
    }
    pages.push('ellipsis')
    pages.push(totalPages - 1)
  }

  return pages.map((page) =>
    page === 'ellipsis' ? (
      <button
        key={'ellipsis'}
        onClick={() => setShowAllPages(true)}
        className={`rounded-md px-2 text-textPrimary ${currentPage > 2 && currentPage < totalPages - 1 ? 'bg-muted' : 'bg-background'}`}
      >
        ...
      </button>
    ) : (
      <button
        key={page}
        onClick={() => {
          setCurrentPage(() => page)
          if (showAllPages) setShowAllPages(false)
        }}
        className={`mx-1 rounded-md px-3 py-1 text-xs hover:bg-muted md:text-sm ${
          currentPage === page ? 'bg-muted' : 'bg-background'
        } text-textPrimary`}
      >
        {page + 1}
      </button>
    )
  )
}

export default PageButtons
