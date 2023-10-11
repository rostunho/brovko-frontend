import { useState, useEffect } from 'react';
import Heading from 'shared/components/Heading';
import Input from 'shared/components/Input';
import styles from './PaymentMethod.module.scss';

export default function PaymentMethod({ extractMethod, ...props }) {
  const [paymentMethod, setPaymentMethod] = useState({
    describe: 'Готівка',
    method: 'cash',
  });

  useEffect(() => {
    extractMethod && extractMethod(paymentMethod);
  }, [extractMethod, paymentMethod]);

  const selectMethod = event => {
    const { value, dataset } = event.target;

    setPaymentMethod(prevMethod => ({
      ...prevMethod,
      describe: value,
      method: dataset.paymethod,
    }));
  };

  return (
    <>
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
            value="Онлайн"
            data-paymethod="online"
            onChange={selectMethod}
          />
        </li>
      </ul>
    </>
  );
}
