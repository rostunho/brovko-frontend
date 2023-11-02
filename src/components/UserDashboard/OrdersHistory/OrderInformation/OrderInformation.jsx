import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Order from '../Order';
import styles from './OrderInformation.module.scss';

import { getAllOrders } from 'redux/basket/basketSelectors';

const OrderInformation = ({
  id,
  picture,
  name,
  note,
  quantity,
  price,
  currencyId,
  val,
}) => {
  const orders = useSelector(getAllOrders);

  const orderList = Array.isArray(orders)
    ? orders.map(({ _id, name, note, picture, quantity, price, value }) => (
        <li key={_id} className={styles.item}>
          <Order
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
    <>
      <p className={styles.textDetail}>Інформація про замовлення</p>
      <ul className={styles.list}>{orderList}</ul>
    </>
  );
};

export default OrderInformation;
