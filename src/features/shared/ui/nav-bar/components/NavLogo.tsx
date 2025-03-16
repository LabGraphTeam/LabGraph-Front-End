import Logo from '../../logo'

interface NavLogoProps {
  className?: string
  h1Style?: string
  h2Style?: string
}

const NavLogo = ({
  className = 'w-10 opacity-90 sm:w-4 md:w-6 lg:w-12',
  h1Style = 'text-xs font-bold italic text-textPrimary opacity-90 sm:text-3xl md:text-3xl',
  h2Style = 'text-[10px] text-textPrimary opacity-70 md:text-xs'
}: NavLogoProps) => (
  <div className=''>
    {/* <div className='flex size-8 items-center justify-center rounded-xl bg-textSecondary shadow-lg transition-all duration-300 hover:rotate-3 hover:scale-110 hover:bg-primary sm:size-10'>
      <span className='text-lg font-bold text-surface transition-all duration-300 hover:scale-110 sm:text-xl'>
        L
      </span>
    </div>
    <div className='flex flex-col'>
      <span className='text-lg font-bold text-textSecondary transition-all duration-300 hover:translate-y-[2px] hover:text-textPrimary sm:text-2xl'>
        <em>LabGraph</em>
        <span className='animate-pulse align-top text-[6px] text-textSecondary md:text-[8px]'>
          ®
        </span>
      </span>
      <span className='-mt-1 text-[8px] text-textSecondary transition-all duration-300 hover:translate-x-1 hover:text-textPrimary sm:text-[8px]'>
        Quality management easy
      </span>
    </div> */}
    <Logo title='LabGraph' className={className} h1Style={h1Style} h2Style={h2Style} />
  </div>
)

export default NavLogo
