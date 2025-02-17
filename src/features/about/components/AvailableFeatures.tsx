
import { FEATURE_ITEMS } from '@/features/about/constants/featureConstants';
import { FeatureCard } from '@/features/about/components/Cards';

const AvailableFeatures: React.FC = () => (
  <div className='py-12'>
    <h2 className='mb-12 text-center text-3xl font-semibold text-textSecondary'>
      Available Features
    </h2>
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {FEATURE_ITEMS.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  </div>
);

export default AvailableFeatures;
