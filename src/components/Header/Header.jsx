import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from 'shared/icons/Logo';
import Navigation from 'components/Navigation/Navigation';
import UserLight from 'shared/icons/UserLight';
import BasketLight from 'shared/icons/BasketLight';

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
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <Navigation
            isDesktop={isDesktop}
            isTablet={isTablet}
            isMobile={isMobile}
          />
        </div>
        <div>
          <Logo />
        </div>
        <div className={styles.boxBasket}>
          <UserLight />
          <BasketLight />
        </div>
      </div>
    </header>
  );
}
