import Footer from '@/features/shared/ui/footer';

import AboutNavbar from '@/features/about/components/AboutNavbar';
import AvailableFeatures from '@/features/about/components/AvailableFeatures';
import Carousel from '@/features/about/components/Carousel';
import Contacts from '@/features/about/components/Contacts';
import FAQSection from '@/features/about/components/FAQ';
import Overview from '@/features/about/components/Overview';

const AboutUs = () => {
  const carouselImages = [
    { id: 1, src: '/reports.jpg', alt: 'view result by table' },
    { id: 2, src: '/lab.jpg', alt: 'view result by chart' },
    { id: 3, src: '/labbancada.jpg', alt: 'generate reports' },
    { id: 4, src: '/lab4.jpg', alt: 'alerts by email' },
  ];

  return (
    <div id='overview' className='flex min-h-screen flex-col bg-background'>
      <AboutNavbar />

      <div className='mx-auto flex w-full max-w-7xl flex-col items-center space-y-2 px-4 py-8'>
        <section id='carousel' className='w-full'>
          <Carousel images={carouselImages} />
        </section>

        <section id='features' className='w-full'>
          <Overview />
          <AvailableFeatures />
        </section>

        <section className='w-full'>
          <FAQSection />
        </section>

        <section id='contact' className='w-full'>
          <Contacts />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
