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
  orderHistory,
}) => {
  // const orders = useSelector(getAllOrders);

  const orderList = Array.isArray(orderHistory)
    ? orderHistory.map(
        ({
          amount,
          commission,
          costPerItem,
          description,
          discount,
          id,
          name,
          sku,
        }) => (
          <li key={id} className={styles.item}>
            <Order
              id={id}
              name={name}
              note={note}
              picture={picture}
              price={costPerItem}
              val={amount}
            />
          </li>
        )
      )
    : null;

  return (
    <>
      <p className={styles.textDetail}>Інформація про замовлення</p>
      <ul className={styles.list}>{orderList}</ul>
    </>
  );
};

export default OrderInformation;
