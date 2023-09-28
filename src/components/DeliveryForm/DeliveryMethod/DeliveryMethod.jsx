import { useState, useEffect } from 'react';
import Input from 'shared/components/Input';
import styles from './DeliveryMethod.module.scss';

export default function DeliveryMethod({ handleDeliveryMethod, ...props }) {
  const [selectedMethod, setSelectedMethod] = useState({
    describe: 'Доставка на відділення Нової Пошти',
    method: 'warehouse',
  });

  useEffect(() => {
    handleDeliveryMethod(selectedMethod);
  }, [handleDeliveryMethod, selectedMethod]);

  const selectMethod = event => {
    const { value, dataset } = event.target;

    setSelectedMethod(prevMethod => ({
      ...prevMethod,
      describe: value,
      method: dataset.deliverypoint,
    }));
  };

  return (
    <>
      <ul className={styles.list}>
        <li>
          <Input
            {...props}
            type="radio"
            name="deliveryMethod"
            label="Доставка на відділення Нової Пошти"
            value="Відділення Нової Пошти"
            data-deliverypoint="warehouse"
            onChange={selectMethod}
            defaultChecked
          />
        </li>
        <li>
          <Input
            {...props}
            type="radio"
            name="deliveryMethod"
            label="Доставка на поштомат Нової Пошти"
            onChange={selectMethod}
            value="Поштомат Нової Пошти"
            data-deliverypoint="postMachine"
          />
        </li>
        <li>
          <Input
            {...props}
            type="radio"
            name="deliveryMethod"
            label="Доставка кур'єром за адресою"
            onChange={selectMethod}
            value="Доставка кур'єром"
            data-deliverypoint="address"
          />
        </li>
      </ul>
    </>
  );
}
