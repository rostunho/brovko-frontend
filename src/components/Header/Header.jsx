import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from 'shared/icons/Logo';
import Navigation from 'components/Navigation/Navigation';
import UserLight from 'shared/icons/UserLight';
import BasketLight from 'shared/icons/BasketLight';
import ModalProductsInBasket from 'components/ModalProductsInBasket/ModalProductsInBasket';
import Button from 'shared/components/Button';

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

  const [basketIsOpen, setBasketIsOpen] = useState(false); // змінити пізніше
  console.log('basketIsOpen', basketIsOpen);

  const openModal = () => {
    setBasketIsOpen(true);
  };

  const closeModal = () => {
    console.log('close');
    setBasketIsOpen(false);
  };

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
          <Link to="/main">
            <Logo />
          </Link>
        </div>
        <div className={styles.boxBasket}>
          <Link to="./auth/login" className={styles.userIcon}>
            <UserLight />
          </Link>
          <button type="button" onClick={openModal} className={styles.userIcon}>
            <BasketLight />
          </button>
          {basketIsOpen && <ModalProductsInBasket closeModal={closeModal} />}
        </div>
      </div>
    </header>
  );
}
