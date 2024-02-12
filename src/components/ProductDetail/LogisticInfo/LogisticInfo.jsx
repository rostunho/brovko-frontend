import styles from './LogisticInfo.module.scss';

export default function LogisticInfo() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Доставка</h3>
      <p className={styles.info}>
        По Львову: Новою Поштою (за рахунок покупця). Можливий самовивіз із
        продуктового ринку Шувар. По Україні: Новою Поштою. Вартість доставки
        оплачує покупець.
      </p>
      <h3 className={styles.title}>Оплата</h3>
      <p className={styles.info}>
        Банківською карткою або при отриманні у відділенні Нової Пошти.
      </p>
    </div>
  );
}
