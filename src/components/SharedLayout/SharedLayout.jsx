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
import Loader from 'components/Loader';

const SharedLayout = () => {
  const [showToTopButton, fadeOut, setShowToTopButton] = useFadeOut(500);
  const screenWidth = useScreenWidth();
  const scroll = useScroll();

  useEffect(() => {
    setShowToTopButton(screenWidth <= 768 && scroll >= 700);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth, scroll]);

  return (
    <div className={styles.layout}>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        <Rectangle />
        {showToTopButton && <BackToTopButton animation={fadeOut} />}
      </main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
