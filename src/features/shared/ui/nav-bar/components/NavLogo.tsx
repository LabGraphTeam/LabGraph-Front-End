const NavLogo = () => (
  <div className='flex items-center gap-2 sm:gap-3'>
    <div className='flex size-8 items-center justify-center rounded-xl bg-textSecondary shadow-lg transition-all duration-300 hover:rotate-3 hover:scale-110 hover:bg-primary sm:size-10'>
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
    </div>
  </div>
);

export default NavLogo;
