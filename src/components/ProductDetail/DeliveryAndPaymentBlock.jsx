import styles from './DeliveryAndPaymentBlock.module.scss'

export const DeliveryAndPaymentBlock = ({ isTabletOrMobile, delivery, payment }) => (
    <div className={styles.deliveryBlock}>
      <h3 className={styles.deliveryHeading}>Доставка</h3>
      <p className={styles.deliveryText}>{delivery}</p>
      <h3 className={styles.deliveryHeading}>Оплата</h3>
      <p className={styles.deliveryText}>{payment}</p>
    </div>
  );