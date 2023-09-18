import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AllUserNav from './AllUserNav';
import AuthNav from './AuthNav';
import ProductrNav from './ProductNav';
import MobileMenu from '../MobileMenu/MobileMenu';
import { selectIsLogin } from 'redux/user/userSelectors';

import Button from 'shared/components/Button';
import styles from './Navigation.module.scss';

const Navigation = ({ isMobile }) => {
  //   const userLoggedIn = true;
  const isUserLogin = useSelector(selectIsLogin);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  //   useEffect(() => {
  //     if (isDesktop) {
  //       setShowMobileMenu(false);
  //     }
  //   }, [isDesktop]);

  const toggleMobileMenu = e => {
    // e.preventDefault();
    // console.log('Toggle Mobile Menu');
    setShowMobileMenu(showMobileMenu => !showMobileMenu);
  };

  return (
    <div className={styles.navigation}>
      {
        <>
          <Button mode="menu" onClick={toggleMobileMenu} />
          {/* <MobileMenuIcon
            className={styles.burger}
            onClick={toggleMobileMenu}
          /> */}
          {/* {!isUserLogin && <AuthNav />}
          {isUserLogin && <UserNav />} */}
        </>
      }
      {showMobileMenu && (
        <MobileMenu onClick={toggleMobileMenu} isMobile={isMobile}>
          <ProductrNav onClick={toggleMobileMenu} />
          <AllUserNav onClick={toggleMobileMenu} />
          <AuthNav onClick={toggleMobileMenu} />
        </MobileMenu>
      )}
    </div>
  );
};

export default Navigation;
