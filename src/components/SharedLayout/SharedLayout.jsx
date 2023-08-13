import { Outlet } from 'react-router-dom';

import Header from 'components/Header/Header';
import Footer from 'components/Footer';

import styles from './SharedLayout.module.scss';

const SharedLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
