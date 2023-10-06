import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllOrders } from 'redux/basket/basketSelectors';

import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal/Modal';
import Heading from 'shared/components/Heading';
import QuantityButtonModal from 'shared/components/QuantityButtonModal/QuantityButtonModal';
import Rectangle from 'components/Rectangle/Rectangle';

import styles from './ModalProductsInBasket.module.scss';

const ModalProductsInBasket = ({ closeModal }) => {
  const orders = useSelector(getAllOrders);
  console.log('orders', orders);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const totalAmount = orders.reduce((total, { price, value }) => {
      return total + price * value;
    }, 0);

    setTotalAmount(totalAmount);
  }, [orders]);

  const navigate = useNavigate();

  const hendlClickReturn = () => {
    navigate('/product-list-page');
    closeModal();
  };

  const hendlClickOrder = () => {
    navigate('/order');
    closeModal();
  };

  const orderList = Array.isArray(orders)
    ? orders.map(({ _id, name, note, picture, price, value }) => (
        <li key={_id}>
          <QuantityButtonModal
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
    <div>
      <Modal closeModal={closeModal}>
        <Heading>Товари у кошику</Heading>
        <ul>{orderList}</ul>
        <Rectangle padding={true} />
        <div className={styles.textTotal}>
          <h3 className={styles['text-sum']}>Загальна сума:</h3>
          <p className={styles.total}>
            {totalAmount}
            <span>₴</span>
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
          <Link></Link>
          <Button mode="primary" size="lg" onClick={hendlClickOrder}>
            Оформити замовлення
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default ModalProductsInBasket;
