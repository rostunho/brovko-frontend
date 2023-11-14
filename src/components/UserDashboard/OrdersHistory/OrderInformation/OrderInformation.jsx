import { useSelector } from 'react-redux';
import Order from '../Order';
import styles from './OrderInformation.module.scss';

import { ordersUserHistory } from 'redux/user/userSelectors';

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
  const orders = useSelector(ordersUserHistory);

  const orderList = Array.isArray(orders)
    ? orders.map(
        ({
          amount,
          commission,
          costPerItem,
          description,
          discount,
          id,
          name,
          sku,
          picture,
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
