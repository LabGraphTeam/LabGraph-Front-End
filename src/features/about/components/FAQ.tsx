import { FAQ_ITEMS } from '@/features/about/constants/faqConstants';
import { FAQCard } from '@/features/about/components/Cards';

const FAQ: React.FC = () => (
  <div id='faq' className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
    <h2 className='mb-4 text-center text-3xl font-semibold text-textPrimary'>
      Frequently Asked Questions
    </h2>
    <p className='mx-auto mb-12 max-w-2xl text-center text-textSecondary'>
      Find answers to common questions about our quality control system
    </p>
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {FAQ_ITEMS.map((faq) => (
        <FAQCard key={faq.id} {...faq} />
      ))}
    </div>
  </div>
);

export default FAQ;
