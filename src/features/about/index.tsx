import AboutNavbar from '@/features/about/components/AboutNavBar/AboutNavbar'
import AvailableFeatures from '@/features/about/components/AvailableFeatures'
import Carousel from '@/features/about/components/Carousel'
import Contacts from '@/features/about/components/Contacts'
import FAQSection from '@/features/about/components/FAQ'
import Overview from '@/features/about/components/Overview'
import Footer from '@/features/shared/ui/footer'
import Team from './components/Team'
import { CAROULSEL_IMAGES } from './constants/carouselImages'

const AboutUs = () => {
  return (
    <div id='overview' className='flex min-h-screen flex-col bg-background'>
      <AboutNavbar />
      <div className='mx-auto mt-8 flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-0'>
        <section id='carousel' className='w-full md:py-6'>
          <Carousel images={CAROULSEL_IMAGES} />
        </section>

        <section id='features' className='w-full'>
          <Overview />
          <AvailableFeatures />
        </section>

        <section id='faq' className='w-full'>
          <FAQSection />
        </section>

        <section id='team' className='w-full'>
          <Team />
        </section>

        <section id='contact' className='w-full'>
          <Contacts />
        </section>
      </div>

      <div className='mt-auto'>
        <Footer />
      </div>
    </div>
  )
}

export default AboutUs
