import LabGraphLogo from '@/features/shared/ui/layouts/LabGraphLogo'
import ThemeToggle from '@/features/shared/ui/layouts/ThemeToggle'

interface AuthFormContainerProps {
  children: React.ReactNode
}

const AuthFormContainer = ({ children }: AuthFormContainerProps) => {
  return (
    <div className='flex h-screen items-center justify-center bg-background px-2'>
      <title>LabGraph-Analytics</title>
      <div className='mx-auto w-full max-w-md rounded-xl border border-borderColor px-8 py-6 shadow-md shadow-shadow backdrop-blur-sm transition-all duration-300 ease-in-out sm:px-12 sm:py-8'>
        <div className='absolute right-4 top-4 z-50'>
          <ThemeToggle />
        </div>
        <div className='mb-6 text-center'>
          <div className='flex justify-center text-secondary opacity-95 transition-transform duration-300 ease-in-out'>
            <LabGraphLogo className='w-32 opacity-90 sm:w-40 md:w-48 lg:w-56' />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default AuthFormContainer
