import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getAllOrders } from 'redux/basket/basketSelectors';
import Logo from 'shared/icons/Logo';
import Navigation from 'components/Navigation/Navigation';
import UserLight from 'shared/icons/UserLight';
import BasketLight from 'shared/icons/BasketLight';
import ModalProductsInBasket from 'components/ModalProductsInBasket/ModalProductsInBasket';
import Ellipse from 'shared/icons/Ellipse';
import Button from 'shared/components/Button';

import styles from './Header.module.scss';

export default function Header({ toggleMobileMenu, isMobileMenuOpen }) {
  const orders = useSelector(getAllOrders);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1280
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1280);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isDesktop, isMobile, isTablet]);

  const [basketIsOpen, setBasketIsOpen] = useState(false);

  const handleOnClick = () => {
    !pathname.includes('order') ? openModal() : scrollToBottom();
  };

  const openModal = () => {
    setBasketIsOpen(true);
  };

  const closeModal = () => {
    setBasketIsOpen(false);
  };

  const scrollToBottom = () => {
    window.scrollBy({ top: 86, behavior: 'smooth' });
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
        <div className={styles.logo}>
          <Link to="/main">
            <Logo />
          </Link>
        </div>
        <div className={styles.boxBasket}>
          <Link to="shop/user" className={styles.userIcon}>
            <UserLight />
          </Link>
          <button
            type="button"
            onClick={handleOnClick}
            className={styles.buttonBasket}
          >
            <BasketLight />
            {orders.length !== 0 && (
              <div className={styles.ellips}>
                <Ellipse />
                <span className={styles.ellipsSpan}>{orders.length}</span>
              </div>
            )}
          </button>
          {basketIsOpen && <ModalProductsInBasket closeModal={closeModal} />}
        </div>
      </div>
      {/* <Button
        mode={isMobileMenuOpen ? 'close' : 'menu'} // Змінюйте значок на 'close', коли меню відкрите
        size="lg"
        onClick={toggleMobileMenu}
      /> */}
    </header>
  );
}
