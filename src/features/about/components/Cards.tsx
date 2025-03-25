import {
  ContactItemProps,
  FAQProps,
  FeatureProps,
  OverviewProps,
  TeamMemberProps
} from '@/types/About'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export const FeatureCard: React.FC<FeatureProps> = ({ title, description, icon }) => (
  <div className='card-hover hover:bg-primaryLight/5 group rounded-2xl border border-borderColor bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl'>
    <div className='mb-4 flex items-center space-x-3'>
    <div className='text-primary transition-colors duration-300 group-hover:text-accent'>
        {icon}
      </div>
      <h3 className='text-lg font-semibold text-textPrimary  group-hover:text-accent'>{title}</h3>
    </div>
    <p className='text-sm leading-relaxed text-textSecondary'>{description}</p>
  </div>
)

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
)

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
)

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
)

export const TeamMemberCard: React.FC<TeamMemberProps> = ({ name, role, image, bio, social }) => (
  <div className='card-hover group rounded-2xl border border-borderColor bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl'>
    <div className='mb-4 flex flex-col items-center'>
      <div className='relative h-32 w-32 overflow-hidden rounded-full'>
        <Image
          alt={name}
          className='transition-transform duration-300 group-hover:scale-110'
          layout='fill'
          objectFit='cover'
          src={image ?? '/team/placeholder.jpg'}
        />
      </div>
      <h3 className='mt-4 text-lg font-semibold text-textPrimary'>{name}</h3>
      <p className='text-sm font-medium text-primary'>{role}</p>
    </div>
    <p className='mb-4 text-center text-sm leading-relaxed text-textSecondary'>{bio}</p>
    <div className='flex justify-center space-x-4'>
      {social?.linkedin ? <Link
          className='text-textSecondary transition-colors hover:text-textPrimary'
          href={social.linkedin}
          rel='noopener noreferrer'
          target='_blank'
        >
          <FaLinkedin size={20} />
        </Link> : null}
      {social?.github ? <Link
          className='text-textSecondary transition-colors hover:text-textPrimary'
          href={social.github}
          rel='noopener noreferrer'
          target='_blank'
        >
          <FaGithub size={20} />
        </Link> : null}
    </div>
  </div>
)
