export interface NavLinksComponentProps {
  onLogout: () => void;
}

export interface MobileMenuProps {
  isMenuOpen: boolean;
  onLogout: () => void;
}

export interface NavBarProps {}

export interface NavLinkProps {
  id: string;
  text: string;
  url: string;
  title?: string;
  onClick?: () => Promise<void>;
}
