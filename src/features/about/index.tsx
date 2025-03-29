import AboutNavbar from '@/features/about/components/AboutNavBar/AboutNavbar'
import AvailableFeatures from '@/features/about/components/AvailableFeatures'
import Carousel from '@/features/about/components/Carousel'
import Contacts from '@/features/about/components/Contacts'
import FAQSection from '@/features/about/components/FAQ'
import Overview from '@/features/about/components/Overview'
import Team from '@/features/about/components/Team'
import { CAROULSEL_IMAGES } from '@/features/about/constants/carouselImages'
import Footer from '@/features/shared/ui/layouts/Footer'

const AboutUs = () => {
  return (
    <div className='flex min-h-screen flex-col bg-background' id='overview'>
      <AboutNavbar />
      <div className='mx-auto mt-8 flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-0'>
        <section className='w-full md:py-6' id='carousel'>
          <Carousel images={CAROULSEL_IMAGES} />
        </section>

        <section className='w-full' id='features'>
          <Overview />
          <AvailableFeatures />
        </section>

        <section className='w-full' id='faq'>
          <FAQSection />
        </section>

        <section className='w-full' id='team'>
          <Team />
        </section>

        <section className='w-full' id='contact'>
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
