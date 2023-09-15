import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Heading from 'shared/components/Heading';
import QuantityButtonModal from 'shared/components/QuantityButtonModal/QuantityButtonModal';
import CustomerSwitcher from 'components/CustomerSwitcher';
import styles from './OrderPage.module.scss';

export default function OrderPage() {
  return (
    <div className={styles.container}>
      <Heading>Оформлення замовлення</Heading>
      {/* // change later */}
      <QuantityButtonModal />
      <QuantityButtonModal />
      {/* // to this place */}
      <CustomerSwitcher />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
}
