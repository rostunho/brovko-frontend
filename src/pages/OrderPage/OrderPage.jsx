import { Suspense, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllOrders } from 'redux/basket/basketSelectors';
import Heading from 'shared/components/Heading';
import QuantityButtonModal from 'shared/components/QuantityButtonModal/QuantityButtonModal';
import CustomerSwitcher from 'components/CustomerSwitcher';
import styles from './OrderPage.module.scss';

export default function OrderPage() {
  const orders = useSelector(getAllOrders);
  console.log('orders', orders);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const totalAmount = orders.reduce((total, { price, value }) => {
      return total + price * value;
    }, 0);

    setTotalAmount(totalAmount);
  }, [orders]);

  const orderList = Array.isArray(orders)
    ? orders.map(({ _id, name, note, picture, price, value }) => (
        <li key={_id}>
          <QuantityButtonModal
            id={_id}
            name={name}
            note={note}
            picture={picture}
            price={price}
            val={value}
          />
        </li>
      ))
    : null;
  return (
    <div className={styles.container}>
      <Heading>Оформлення замовлення</Heading>
      <div className={styles.textTotal}>
        <h3 className={styles['text-sum']}>Ваше замовлення на суму:</h3>
        <p className={styles.total}>
          {totalAmount}
          <span>₴</span>
        </p>
      </div>
      <ul>{orderList}</ul>
      <CustomerSwitcher />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
}
