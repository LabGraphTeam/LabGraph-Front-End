import { FeatureProps, OverviewProps, FAQProps, ContactItemProps } from '@/features/about/types/about';

export const FeatureCard: React.FC<FeatureProps> = ({ title, description, icon }) => (
  <div className='card-hover group rounded-2xl border border-borderColor bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl'>
    <div className='mb-4 flex items-center space-x-3'>
      <div className='text-primary transition-colors duration-300 group-hover:text-accent'>
        {icon}
      </div>
      <h3 className='text-lg font-semibold text-textSecondary'>
        {title}
      </h3>
    </div>
    <p className='text-sm leading-relaxed text-textSecondary'>
      {description}
    </p>
  </div>
);

export const OverviewCard: React.FC<OverviewProps> = ({ title, description, icon }) => (
  <div className='card-hover hover:bg-primaryLight/5 group rounded-2xl border border-borderColor bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl'>
    <div className='mb-4 flex items-center space-x-3'>
      <div className='bg-primary/5 group-hover:bg-accent/10 rounded-lg p-2 text-primary transition-all duration-300 group-hover:text-accent'>
        {icon}
      </div>
      <h3 className='text-lg font-semibold text-textPrimary transition-colors duration-300 group-hover:text-accent'>
        {title}
      </h3>
    </div>
    <p className='text-sm leading-relaxed text-textSecondary transition-colors duration-300 group-hover:text-textPrimary'>
      {description}
    </p>
  </div>
);

export const FAQCard: React.FC<FAQProps> = ({ title, description, icon }) => (
  <div className='card-hover hover:bg-primaryLight/5 group rounded-2xl border border-borderColor bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl'>
    <div className='mb-4 flex items-center space-x-3'>
      <div className='bg-primary/5 group-hover:bg-accent/10 rounded-lg p-2 text-primary transition-all duration-300 group-hover:text-accent'>
        {icon}
      </div>
      <h3 className='text-lg font-semibold text-textPrimary transition-colors duration-300 group-hover:text-accent'>
        {title}
      </h3>
    </div>
    <p className='text-sm leading-relaxed text-textSecondary transition-colors duration-300 group-hover:text-textPrimary'>
      {description}
    </p>
  </div>
);

export const ContactCard: React.FC<ContactItemProps> = ({ icon, title, content }) => (
  <div className='card-hover hover:bg-primaryLight/5 group flex items-center gap-6 rounded-2xl border border-borderColor bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl'>
    <div className='bg-primary/5 group-hover:bg-accent/10 rounded-lg p-3 text-primary transition-all duration-300 group-hover:text-accent'>
      {icon}
    </div>
    <div className='space-y-1'>
      <h3 className='text-lg font-semibold text-textPrimary transition-colors duration-300 group-hover:text-accent'>
        {title}
      </h3>
      <p className='text-textSecondary transition-colors duration-300 group-hover:text-textPrimary'>
        {content}
      </p>
    </div>
  </div>
);
