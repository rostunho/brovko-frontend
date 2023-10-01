import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from 'redux/basket/basketSlice';

import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal/Modal';
import Heading from 'shared/components/Heading';
import QuantityButtonModal from 'shared/components/QuantityButtonModal/QuantityButtonModal';
import Rectangle from 'components/Rectangle/Rectangle';

import styles from './ModalProductsInBasket.module.scss';

const ModalProductsInBasket = ({ closeModal }) => {
  const orders = useSelector(state => state.basket);
  // const dispatch = useDispatch();

  let key = 0;

  // const handlePlusOneOrder = () => {
  //   dispatch(addOrder(order));
  // };

  const navigate = useNavigate();

  const hendlClickReturn = () => {
    navigate('/product-list-page');
  };

  const hendlClickOrder = () => {
    navigate('/order-page');
  };

  const orderList = orders.map(item => (
    <li key={key++}>
      <QuantityButtonModal />
    </li>
  ));

  return (
    <div>
      <Modal closeModal={closeModal}>
        <Heading>Товари у кошику</Heading>
        <ul>{orderList}</ul>
        <Rectangle padding={true} />
        <div className={styles.textTotal}>
          <h3 className={styles['text-sum']}>Загальна сума:</h3>
          <p className={styles.total}>
            0<span>₴</span>
          </p>
        </div>
        {/* Delete */}
        {/* <button type="button" onClick={handlePlusOneOrder}></button> */}
        {/* Delete */}
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
