import { Link, useNavigate } from 'react-router-dom';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal/Modal';
import Heading from 'shared/components/Heading';
import OrderList from 'shared/components/OrderList';

import styles from './ModalProductsInBasket.module.scss';

const ModalProductsInBasket = ({ closeModal }) => {
  const navigate = useNavigate();

  const hendlClickReturn = () => {
    navigate('/shop/product-list-page');
    closeModal();
  };

  const hendlClickOrder = () => {
    navigate('/order');
    closeModal();
  };

  return (
    <div>
      <Modal closeModal={closeModal}>
        <Heading>Товари у кошику</Heading>
        <OrderList totalLabel="Загальна сума:" />
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
