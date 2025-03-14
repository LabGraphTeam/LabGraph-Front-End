import ThemeToggle from '@/features/shared/theme'
import Logo from '@/features/shared/ui/logo'

export default function Form() {
  return (
    <div className='flex h-screen items-center justify-center bg-gradient-to-br from-primary to-background px-2'>
      <div className='mx-auto w-full max-w-md rounded-xl border border-borderColor px-8 py-6 shadow-xl backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-2xl sm:px-12 sm:py-8'>
        <div className='absolute right-4 top-4 z-50'>
          <ThemeToggle />
        </div>
        <div className='mb-6 text-center'>
          <div className='flex justify-center text-secondary opacity-95 transition-transform duration-300 ease-in-out'>
            <Logo className='w-32 opacity-90 sm:w-40 md:w-48 lg:w-56' />
          </div>
        </div>
      </div>
    </div>
  )
}
