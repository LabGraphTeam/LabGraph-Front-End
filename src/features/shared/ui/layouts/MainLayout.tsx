import Footer from '@/shared/ui/footer'
import NavBar from '@/shared/ui/nav-bar'
import { MainLayoutProps } from '@/types/AnalyticsTable'

const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div className='bg-background'>
      <div className='flex flex-col place-content-center items-center'>
        <title>{title}</title>
        <NavBar />
        <div className='w-11/12'>{children}</div>
        <div className='flex flex-col items-center justify-end'>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
