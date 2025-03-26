import Link from 'next/link'

import { CustomErrorProps } from '@/shared/utils/custom-errors/types/CustomErrorProps'

const CustomError = ({ code, title, message }: Readonly<CustomErrorProps>) => {
  return (
    <main className='flex min-h-screen items-center justify-center bg-background'>
      <div className='flex flex-col items-center gap-4 rounded-3xl bg-surface p-8 shadow-md shadow-shadow backdrop-blur-sm transition-transform sm:p-10'>
        <div className='text-[100px] font-bold text-textSecondary sm:text-[140px]'>{code}</div>
        <h1 className='text-2xl font-bold text-textSecondary underline sm:text-4xl'>{title}</h1>
        <p className='mt-4 text-sm text-textSecondary sm:mt-6 sm:text-xl'>{message}</p>
        <svg
          className='mt-8 size-12 text-textSecondary'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
          />
        </svg>
        <Link className='mt-4 text-sm font-medium text-textPrimary underline md:text-base' href='/'>
          Back to Home
        </Link>
      </div>
    </main>
  )
}
export default CustomError
