import { useState, useEffect } from 'react';
import Nav from './AllUserNav';
import UserNav from './UserNav';
import AuthNav from './AuthNav';
import MobileMenu from '../MobileMenu/MobileMenu';
import MobillMenuIcon from 'shared/icons/MobillMenuIcon';
import { selectIsLogin } from 'redux/user/userSelectors';
import styles from './Navigation.module.scss';
import { useSelector } from 'react-redux';

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
          {!isUserLogin && <AuthNav />}
          {isUserLogin && <UserNav />}
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
