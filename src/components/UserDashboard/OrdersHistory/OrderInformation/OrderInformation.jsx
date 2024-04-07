import Order from '../Order';
import styles from './OrderInformation.module.scss';

const OrderInformation = ({ order }) => {
  const orderList = order.data.products.map(
    ({ amount, productId, name, price, picture }) => (
      <li key={productId} className={styles.item}>
        <Order
          id={productId}
          name={name}
          price={price}
          val={amount}
        />
      </li>
    )
  );

  return (
    <>
      <p className={styles.textDetail}>Інформація про замовлення</p>
      <ul className={styles.list}>{orderList}</ul>
      <p className={styles.text}>Одержувач</p>
      <p className={styles.textGet}>
        {order.data.contacts[0].fName} {order.data.contacts[0].lName}
      </p>
      <p className={styles.text}>Тип доставки</p>
      <p className={styles.textGet}>{order.data.shipping_address}</p>
      <p className={styles.textGet}>
        {order.meta.fields.shipping_method.options[0].text}
      </p>
      <p className={styles.text}>Спосіб оплати</p>
      <p className={styles.textGet}>
        {order.meta.fields.payment_method.options[0].text}
      </p>
    </>
  );
};

export default OrderInformation;
