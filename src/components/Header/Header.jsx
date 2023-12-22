import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getAllOrders } from 'redux/basket/basketSelectors';
import { selectIsLogin, selectUser } from 'redux/user/userSelectors';
import Logo from 'shared/icons/Logo';
import Navigation from 'components/Navigation/Navigation';
import UserLight from 'shared/icons/UserLight';
import BasketLight from 'shared/icons/BasketLight';
import ModalProductsInBasket from 'components/ModalProductsInBasket/ModalProductsInBasket';
import Ellipse from 'shared/icons/Ellipse';
import Avatar from 'components/Avatar';
import useModal from 'shared/hooks/useModal';
import styles from './Header.module.scss';

export default function Header({ toggleMobileMenu, isMobileMenuOpen }) {
  const orders = useSelector(getAllOrders);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1280
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const userIsLoggedIn = useSelector(selectIsLogin);
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

  const { isOpen, openModal, closeModal } = useModal();

  const handleOnClick = () => {
    !pathname.includes('order') ? openModal() : scrollToBottom();
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
            {userIsLoggedIn ? (
              <Avatar size="32px" marginBottom="0" />
            ) : (
              <UserLight />
            )}
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
          {isOpen && <ModalProductsInBasket closeModal={closeModal} />}
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
