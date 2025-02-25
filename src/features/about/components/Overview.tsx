import { OVERVIEW_ITEMS } from '@/features/about/constants/overviewConstants';
import { OverviewCard } from '@/features/about/components/Cards';

const Overview: React.FC = () => (
  <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
    <h2 className='mb-4 text-center text-3xl font-semibold text-textPrimary'>Overview</h2>
    <p className='mx-auto mb-12 max-w-2xl text-center text-textSecondary'>
      Discover how our platform revolutionizes laboratory quality control management
    </p>
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {OVERVIEW_ITEMS.map((feature) => (
        <OverviewCard key={feature.title} {...feature} />
      ))}
    </div>
  </div>
);

export default Overview;
