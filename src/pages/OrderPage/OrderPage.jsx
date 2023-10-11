import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Heading from 'shared/components/Heading';
import CustomerSwitcher from 'components/CustomerSwitcher';
import OrderList from 'shared/components/OrderList';
import styles from './OrderPage.module.scss';

export default function OrderPage() {
  return (
    <div className={styles.container}>
      <Heading>Оформлення замовлення</Heading>
      <OrderList totalLabel="Ваше замовлення на суму:" lastCheck />
      <CustomerSwitcher />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
}
