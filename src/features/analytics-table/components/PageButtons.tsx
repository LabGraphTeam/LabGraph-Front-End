import React, { useState } from 'react'

import { PageButtonsProps } from '@/types/AnalyticsTable'

const PageButtons: React.FC<PageButtonsProps> = ({ totalPages, currentPage, setCurrentPage }) => {
  const [showAllPages, setShowAllPages] = useState(false)

  if (totalPages === undefined) return null

  const pages: (number | 'ellipsis')[] = []
  if (showAllPages || totalPages <= 4) {
    for (let i = 0; i < totalPages; i++) {
      pages.push(i)
      return
    }
  }
  for (let i = 0; i < 3; i++) {
    pages.push(i)
  }
  pages.push('ellipsis')
  pages.push(totalPages - 1)

  return pages.map((page) =>
    page === 'ellipsis' ? (
      <button
        className={`rounded-md px-2 text-textPrimary ${currentPage > 2 && currentPage < totalPages - 1 ? 'bg-muted' : 'bg-background'}`}
        key='ellipsis'
        onClick={() => setShowAllPages(true)}
      >
        ...
      </button>
    ) : (
      <button
        className={`mx-1 rounded-md px-3 py-1 text-xs hover:bg-muted md:text-sm ${
          currentPage === page ? 'bg-muted' : 'bg-background'
        } text-textPrimary`}
        key={page}
        onClick={() => {
          setCurrentPage(() => page)
          if (showAllPages) setShowAllPages(false)
        }}
      >
        {page + 1}
      </button>
    )
  )
}

export default PageButtons
