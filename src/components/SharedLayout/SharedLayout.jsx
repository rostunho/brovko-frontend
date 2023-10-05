import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header/Header';
import Footer from 'components/Footer';
import Rectangle from 'components/Rectangle/Rectangle';

import ModalProductsInBasket from 'components/ModalProductsInBasket/ModalProductsInBasket';

import styles from './SharedLayout.module.scss';

const SharedLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        <Suspense fallback={<div>Loading page...</div>}>
          <Outlet />
        </Suspense>
        <Rectangle />
      </main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
