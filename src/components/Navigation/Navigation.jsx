import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useLayoutType from 'shared/hooks/useLayoutType';
import AllUserNav from './AllUserNav';
import AuthNav from './AuthNav';
import ProductrNav from './ProductNav';

import MobileMenu from '../MobileMenu/MobileMenu';
import { selectIsLogin } from 'redux/user/userSelectors';

import Button from 'shared/components/Button';
import HeartIcon from 'shared/icons/HeartIcon';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const layoutType = useLayoutType();
  const isMobile = layoutType === 'mobile';
  const isTablet = layoutType === 'tablet';
  const isDesktop = layoutType === 'desktop';
  // const userLoggedIn = true;
  // const isUserLogin = useSelector(selectIsLogin);

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = e => {
    e.preventDefault();
    // console.log('Toggle Mobile Menu');
    setShowMobileMenu(showMobileMenu => !showMobileMenu);
  };

  return (
    <nav className={styles.navigation}>
      {isMobile && (
        <>
          <Button
            mode={showMobileMenu ? 'close' : 'menu'}
            size="lg"
            onClick={toggleMobileMenu}
          />
          {showMobileMenu && (
            <MobileMenu onClick={toggleMobileMenu} isMobile={isMobile}>
              <ProductrNav isMobile={isMobile} onClick={toggleMobileMenu} />
              <AllUserNav onClick={toggleMobileMenu} />
              <AuthNav onClick={toggleMobileMenu} />
            </MobileMenu>
          )}
        </>
      )}
      {isTablet && (
        <>
          <ProductrNav /> <AllUserNav />
        </>
      )}
      {isDesktop && (
        <>
          <ProductrNav /> <AllUserNav />
          <HeartIcon />
        </>
      )}
    </nav>
  );
};

export default Navigation;
