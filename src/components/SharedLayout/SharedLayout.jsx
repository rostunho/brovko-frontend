import { useEffect, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import useFadeOut from 'shared/hooks/useFadeOut';
import useScreenWidth from 'shared/hooks/useScreenWidth';
import useScroll from 'shared/hooks/useScroll';

import UserDashboardPage from 'pages/UserDashboardPage/UserDashboardPage';

import Header from 'components/Header/Header';
import Footer from 'components/Footer';
import Rectangle from 'components/Rectangle/Rectangle';
import BackToTopButton from 'components/BackToTopButton/BackToTopButton';

import styles from './SharedLayout.module.scss';
import BrovkoHeaderIcon1 from 'shared/icons/BrovkoHeaderIcon1';
import Loader from 'components/Loader';
import CookieConsentBanner from 'components/CookiesBanner/CookiesBanner';
import SEO from 'components/SEO/SEO';

const SharedLayout = () => {
  const [showToTopButton, fadeOut, setShowToTopButton] = useFadeOut(500);
  const screenWidth = useScreenWidth();
  const scroll = useScroll();
  const imageUrl = require('../../logo2.png');

  // const keywords = [
  //   'снеки для собак',
  //   'для собак',
  //   'натуральні снеки',
  //   'корисні смаколики',
  //   'палянички для собак',
  //   'органічні снеки',
  // ];

  useEffect(() => {
    setShowToTopButton(screenWidth <= 768 && scroll >= 700);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth, scroll]);

  return (
    <div className={styles.layout}>
      <Header />
      <SEO
        title="Brovko | Крамниця корисних натуральних снеків для собак"
        description="Brovko - крамниця натуральних снеків для собак. Ароматні, корисні, апетитні смаколикі для собак! Неймовірні палянички із субпродуктів, клітковини, овочів, фруктів, ягід та трав."
        imageUrl={imageUrl}
        url="/"
      />

      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        <Rectangle />
        {showToTopButton && <BackToTopButton animation={fadeOut} />}
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  );
};

export default SharedLayout;
