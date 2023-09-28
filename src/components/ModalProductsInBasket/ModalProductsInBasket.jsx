import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'shared/components/Button';

import Modal from 'shared/components/Modal/Modal';
import Heading from 'shared/components/Heading';
import QuantityButtonModal from 'shared/components/QuantityButtonModal/QuantityButtonModal';
import Rectangle from 'components/Rectangle/Rectangle';

import styles from './ModalProductsInBasket.module.scss';

const ModalProductsInBasket = () => {
  const [order, setOrder] = useState([]);

  const navigate = useNavigate();

  const hendlClickReturn = () => {
    navigate('/product-list-page');
  };

  const hendlClickOrder = () => {
    navigate('/order-page');
  };

  useEffect(() => {
    const storedJsonString = localStorage.getItem('orders');
    const restoredArray = JSON.parse(storedJsonString);
    setOrder(prevstate => [...prevstate, restoredArray]);
  }, []);

  const orderList = order.map(item => (
    <li>
      <QuantityButtonModal />
    </li>
  ));

  return (
    <div>
      <Modal>
        <Heading>Товари у кошику</Heading>
        <ul>{orderList}</ul>
        <QuantityButtonModal />
        <QuantityButtonModal />
        <Rectangle padding={true} />
        <div className={styles.textTotal}>
          <h3 className={styles['text-sum']}>Загальна сума:</h3>
          <p className={styles.total}>
            0<span>₴</span>
          </p>
        </div>
        <div className={styles.wrapperButton}>
          <Button
            mode="outlined"
            size="lg"
            style={{ marginBottom: '12px' }}
            onClick={hendlClickReturn}
          >
            Повернутись до покупок
          </Button>

          <Button mode="primary" size="lg" onClick={hendlClickOrder}>
            Оформити замовлення
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default ModalProductsInBasket;
