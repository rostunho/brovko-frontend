import { useState, useEffect } from 'react';
import Heading from 'shared/components/Heading';
import Input from 'shared/components/Input';
import styles from './PaymentMethod.module.scss';

export default function PaymentMethod({ getData, ...props }) {
  const [paymentMethod, setPaymentMethod] = useState({
    describe: 'Готівка',
    method: 'cash',
  });

  useEffect(() => {
    getData({ ...paymentMethod });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod]);

  const selectMethod = event => {
    const { value, dataset } = event.target;

    setPaymentMethod(prevMethod => ({
      ...prevMethod,
      describe: value,
      method: dataset.paymethod,
    }));
  };

  return (
    <div className={styles.container}>
      <Heading type="h3">Оплата</Heading>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Input
            type="radio"
            name="payment"
            label="Готівкою при отриманні"
            value="Готівка"
            data-paymethod="cash"
            onChange={selectMethod}
            defaultChecked
          />
        </li>
        <li className={styles.item}>
          <Input
            type="radio"
            name="payment"
            label="Карткою онлайн"
            value="Картка Приватбанку"
            data-paymethod="online"
            onChange={selectMethod}
          />
        </li>
      </ul>
    </div>
  );
}
