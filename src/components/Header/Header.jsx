import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo2.png';
// import MobillMenuIcon from 'shared/icons/MobillMenuIcon';
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
    <header className={styles.container}>
      <div className={styles.boxMenu}>
        <Navigation
          isDesktop={isDesktop}
          isTablet={isTablet}
          isMobile={isMobile}
        />
        {/* <MobillMenuIcon /> */}
      </div>

      <div className={styles.boxBasket}>
        <UserLight />
        <BasketLight />
      </div>

      <img src={logo} className={styles.logo} alt="logo" />
    </header>
  );
}
