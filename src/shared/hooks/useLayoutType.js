import { useState, useEffect } from 'react';
import useScreenWidth from './useScreenWidth';

const useLayoutType = () => {
  const [layoutType, setLayoutType] = useState('mobile');
  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (screenWidth < 768) {
      setLayoutType('mobile');
    } else if (screenWidth >= 768 && screenWidth < 1280) {
      setLayoutType('tablet');
    } else {
      setLayoutType('desktop');
    }
  }, [screenWidth]);

  return layoutType;
};

export default useLayoutType;
