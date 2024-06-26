import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { selectIsLogin } from 'redux/user/userSelectors';
import useLayoutType from 'shared/hooks/useLayoutType';
import Logo from 'shared/icons/Logo';
import Navigation from 'components/Navigation/Navigation';
import ModalProductsInBasket from 'components/ModalProductsInBasket/ModalProductsInBasket';
import UserLight from 'shared/icons/UserLight';
import BasketLight from 'shared/icons/BasketLight';
import BrovkoHeaderIcon from 'shared/icons/BrovkoHeaderIcon';
import Ellipse from 'shared/icons/Ellipse';
import Avatar from 'components/Avatar';
import useModal from 'shared/hooks/useModal';
import styles from './Header.module.scss';
import HeartIcon from 'shared/icons/HeartIcon';
import useProductInBasket from 'shared/hooks/useProductInBasket';

export default function Header({ toggleMobileMenu, isMobileMenuOpen }) {
  const layoutType = useLayoutType();
  const isMobile = layoutType === 'mobile';
  const isTablet = layoutType === 'tablet';

  const { showBascketOrders } = useProductInBasket();
  const products = showBascketOrders();

  const userIsLoggedIn = useSelector(selectIsLogin);
  const { pathname } = useLocation();
  const { isOpen, openModal, closeModal } = useModal();

  const handleOnClick = () => {
    !pathname.includes('order') ? openModal() : scrollToBottom();
  };

  const scrollToBottom = () => {
    window.scrollBy({ top: 86, behavior: 'smooth' });
  };

  const renderHeaderNavigation = (isMobile, isTablet, isDesktop) => (
    <Navigation isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} />
  );

  const renderHeaderLogo = () => (
    <div className={styles.logo}>
      <Link to="/main" aria-label="На головну сторінку">
        {isMobile ? <Logo /> : <BrovkoHeaderIcon />}
      </Link>
    </div>
  );

  const renderHeaderBasketBox = () => {
    const avatarSize = isMobile ? '32px' : '40px';
    const iconSize = isMobile ? '32' : '40';

    return (
      <div className={styles.boxBasket}>
        {!isMobile && (
          <Link
            to="shop/favourites"
            aria-label="Відкрити сторінку з улюбленими смаколиками"
            className={styles.userIcon}
          >
            <HeartIcon className={styles.heart_icon} />
          </Link>
        )}
        <Link
          to="/user"
          aria-label={
            userIsLoggedIn ? 'Відкрити сторінку користувача' : 'Зареєструватися'
          }
          className={styles.userIcon}
        >
          {userIsLoggedIn ? (
            <Avatar size={avatarSize} marginBottom="0" locked />
          ) : (
            <UserLight width={iconSize} height={iconSize} />
          )}
        </Link>
        <button
          type="button"
          onClick={handleOnClick}
          className={styles.buttonBasket}
        >
          <BasketLight width={iconSize} height={iconSize} />
          {products && products?.length > 0 && (
            <div className={styles.ellips}>
              <Ellipse />
              <span
                className={
                  products && products.length > 9
                    ? styles.ellipsSpan1
                    : styles.ellipsSpan
                }
              >
                {products?.length}
              </span>
            </div>
          )}
        </button>
        {isOpen && <ModalProductsInBasket closeModal={closeModal} />}
      </div>
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          {isMobile ? renderHeaderNavigation(isMobile) : renderHeaderLogo()}
        </div>
        <div>
          {isMobile ? renderHeaderLogo() : renderHeaderNavigation(isTablet)}
        </div>
        <div>{renderHeaderBasketBox()}</div>
      </div>
    </header>
  );
}
