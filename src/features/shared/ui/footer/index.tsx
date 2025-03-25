import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className='fixed bottom-0 w-full bg-background p-4 text-textSecondary'>
      <div className='container mx-auto flex items-center justify-center space-y-2 md:flex-row md:space-y-0'>
        <div className='text-sm md:text-base'>
          &copy; {new Date().getFullYear()} <strong>Lab-Spec</strong>. All rights reserved.
        </div>
        <span>
          <Link
            className='hover:opacity-80'
            href='https://github.com/LeonardoMeireles55'
            rel='noopener noreferrer'
            target='_blank'
          >
            <Github
              className='ml-4 inline-block rounded-full fill-background p-0'
              size={24}
              strokeWidth={1.5}
            />
          </Link>
          <Link
            className='hover:opacity-80'
            href='https://www.linkedin.com/in/leomeireles55'
            rel='noopener noreferrer'
            target='_blank'
          >
            <Linkedin
              className='ml-4 inline-block rounded-full fill-background p-0'
              size={24}
              strokeWidth={1.5}
            />
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
