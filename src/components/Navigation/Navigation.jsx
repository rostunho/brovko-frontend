import { useState, useEffect } from 'react';
import Nav from './Nav/Nav';
import UserNav from './UserNav/UserNav';
import AuthNav from './AuthNav/AuthNav';
import MobileMenu from '../MobileMenu/MobileMenu';
import MobillMenuIcon from 'shared/icons/MobillMenuIcon';
import styles from './Navigation.module.scss';

const Navigation = ({ isMobile }) => {
  //   const userLoggedIn = true;
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  //   useEffect(() => {
  //     if (isDesktop) {
  //       setShowMobileMenu(false);
  //     }
  //   }, [isDesktop]);

  const toggleMobileMenu = e => {
    e.preventDefault();
    // console.log('Toggle Mobile Menu');
    setShowMobileMenu(showMobileMenu => !showMobileMenu);
  };

  return (
    <div className={styles.navigation}>
      {
        <>
          <MobillMenuIcon
            className={styles.burger}
            onClick={toggleMobileMenu}
          />
        </>
      }
      {showMobileMenu && (
        <MobileMenu onClick={toggleMobileMenu} isMobile={isMobile}>
          {/* <UserNav onClick={toggleMobileMenu} />
          <AuthNav onClick={toggleMobileMenu} /> */}
          <Nav onClick={toggleMobileMenu} />
        </MobileMenu>
      )}
    </div>
  );
};

export default Navigation;
