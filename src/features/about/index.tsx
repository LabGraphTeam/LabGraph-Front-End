import AboutNavbar from '@/features/about/components/AboutNavBar/AboutNavbar'
import AvailableFeatures from '@/features/about/components/AvailableFeatures'
import Carousel from '@/features/about/components/Carousel'
import Contacts from '@/features/about/components/Contacts'
import FAQSection from '@/features/about/components/FAQ'
import Overview from '@/features/about/components/Overview'
import Footer from '@/features/shared/ui/footer'
import { CAROULSEL_IMAGES } from './constants/carouselImages'

const AboutUs = () => {
  return (
    <div id='overview' className='flex min-h-screen flex-col bg-background'>
      <AboutNavbar />

      <div className='mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8'>
        <section id='carousel' className='w-full py-8 md:py-12'>
          <Carousel images={CAROULSEL_IMAGES} />
        </section>

        <section id='features' className='w-full py-8'>
          <Overview />
          <div className='mt-20'>
            <AvailableFeatures />
          </div>
        </section>


        <section id='faq' className='w-full py-8'>
          <FAQSection />
        </section>

        <section id='contact' className='w-full py-8'>
          <Contacts />
        </section>
      </div>

      {/* toFix: implment responsive cards */}
      {/* <section id='team' className='w-full'>
        <Team />
      </section> */}
      
      <div className='mt-auto'>
        <Footer />
      </div>
    </div>
  )
}

export default AboutUs
