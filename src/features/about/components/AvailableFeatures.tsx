import { FeatureCard } from '@/features/about/components/Cards'
import { FEATURE_ITEMS } from '@/features/about/constants/featureConstants'

const AvailableFeatures: React.FC = () => (
  <div className='py-12'>
    <h2 className='mb-4 text-center text-3xl font-semibold text-textPrimary'>
      Available Features
    </h2>
    <p className='mx-auto mb-12 max-w-2xl text-center text-textSecondary'>
      Comprehensive range of features designed to streamline your quality laboratory operations
    </p>
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {FEATURE_ITEMS.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  </div>
)

export default AvailableFeatures

