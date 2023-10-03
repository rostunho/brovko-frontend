import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header/Header';
import Footer from 'components/Footer';
import Rectangle from 'components/Rectangle/Rectangle';

import ModalProductsInBasket from 'components/ModalProductsInBasket/ModalProductsInBasket';

import styles from './SharedLayout.module.scss';

const SharedLayout = () => {
  // const [basketIsOpen, setBasketIsOpen] = useState(true); // змінити пізніше

  // const closeModal = () => {
  //   setBasketIsOpen(false);
  // };
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        {/* змінити пізніше */}
        {/* {basketIsOpen && <ModalProductsInBasket closeModal={closeModal} />} */}
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
