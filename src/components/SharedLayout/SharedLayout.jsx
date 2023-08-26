import { Outlet } from 'react-router-dom';

import Header from 'components/Header/Header';
import Footer from 'components/Footer';
import Rectangle from 'components/Rectangle/Rectangle';

import styles from './SharedLayout.module.scss';

const SharedLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        <Outlet />
        <Rectangle />
      </main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
