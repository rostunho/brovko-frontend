import { useState, useEffect } from 'react';
import { debounce } from 'throttle-debounce';

export default function useScroll() {
  const [scrolledToTop, setScrolledToTop] = useState(0);

  const scrollDetecting = () => {
    const scrolled = window.scrollY;
    setScrolledToTop(scrolled);
  };

  const handleScroll = debounce(250, scrollDetecting);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return scrolledToTop;
}
