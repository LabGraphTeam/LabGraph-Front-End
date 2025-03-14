import { useEffect, useState } from 'react';

type WindowDimensions = {
  width: number;
  height: number;
};

const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = (): void => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return (): void => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
