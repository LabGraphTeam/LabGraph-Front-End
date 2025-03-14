import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { GoogleSheetLinkProps } from '../types/SelectorProps';

const GoogleSheetLink: React.FC<GoogleSheetLinkProps> = ({ googleSheetUrl }) => {
  return (
    <span className='flex flex-row place-content-center items-center'>
      <Link
        className='hover:bg-background/90 focus:ring-borderColor/30 flex items-center justify-center rounded-md border border-borderColor bg-background px-2 py-0.5 text-sm font-medium text-textSecondary shadow-sm transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 md:px-2 md:py-1'
        target='_blank'
        href={googleSheetUrl ?? ''}
      >
        <span className='hidden p-0.5 md:inline'>
          <CheckCircle size={19} />
        </span>
        <span className='inline p-0.5 md:hidden'>
          <CheckCircle size={17} />
        </span>
      </Link>
    </span>
  );
};

export default GoogleSheetLink;
