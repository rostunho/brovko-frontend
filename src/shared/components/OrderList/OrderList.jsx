import { useState, useEffect } from 'react';
import QuantityButtonModal from 'shared/components/QuantityButtonModal/QuantityButtonModal';
import Heading from '../Heading';
import Rectangle from 'components/Rectangle/Rectangle';
import useProductInBasket from 'shared/hooks/useProductInBasket';
import styles from './OrderList.module.scss';

export default function OrderList({
  totalLabel,
  lastCheck,
  setModalDelete,
  setOrderId,
}) {
  const { showBascketOrders } = useProductInBasket();
  const products = showBascketOrders();

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const totalAmount = products.reduce((total, { price, value }) => {
      return total + price * value;
    }, 0);

    setTotalAmount(totalAmount);
  }, [products]);

  const orderList = Array.isArray(products)
    ? products.map(({ _id, name, note, picture, price, value }) => (
        <li key={_id} className={styles.item}>
          <QuantityButtonModal
            id={_id}
            name={name}
            note={note}
            picture={picture}
            price={price}
            val={value}
            setModalDelete={setModalDelete}
            setOrderId={setOrderId}
          />
        </li>
      ))
    : null;

  return (
    <>
      {!lastCheck && (
        <>
          <ul className={styles.list}>{orderList}</ul>
          <Rectangle />
        </>
      )}
      <div className={styles['text-total']}>
        {<Heading type="h3">{totalLabel}</Heading>}
        <p className={styles.total}>{totalAmount.toFixed(2)}₴</p>
      </div>
      {lastCheck && (
        <>
          <ul className={styles.list}>{orderList}</ul>
          <Rectangle />
        </>
      )}
    </>
  );
}
