import { useState, useEffect } from 'react';
import logo from '../../logo.png';

import styles from './Header.module.scss';

export default function Header() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1280
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1280);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isDesktop, isMobile, isTablet]);

  return (
    <header className={styles.container}>
      <img src={logo} className={styles.logo} alt="logo" />

      {/* <Navigation
        isDesktop={isDesktop}
        isTablet={isTablet}
        isMobile={isMobile}
      /> */}
    </header>
  );
}
