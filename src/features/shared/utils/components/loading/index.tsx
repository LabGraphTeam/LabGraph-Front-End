import React, { useEffect, useState } from 'react'

const Loading: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='flex flex-col items-center justify-center gap-4 p-8'>
      <div className='size-12 animate-spin justify-end rounded-full border-t-4 text-primary' />
      {showMessage ? (
        <p className='text-sm text-textPrimary'>Try select other date range.</p>
      ) : null}
    </div>
  )
}

export default Loading
