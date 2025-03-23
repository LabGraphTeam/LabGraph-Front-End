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
  <div>
    <Logo title='LabGraph' className={className} h1Style={h1Style} h2Style={h2Style} />
  </div>
)

export default NavLogo
