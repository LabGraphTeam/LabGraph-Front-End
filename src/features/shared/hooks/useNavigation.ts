import { useState } from 'react';

const useNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return {
    isMenuOpen,
    setIsMenuOpen,
  };
};

export default useNavigation;
