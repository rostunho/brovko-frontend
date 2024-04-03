import { useEffect } from 'react';

export const useBodyScrollLock = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);
};
