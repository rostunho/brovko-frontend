import Button from 'shared/components/Button';

import Modal from 'shared/components/Modal/Modal';
import Heading from 'shared/components/Heading';
import QuantityButtonModal from 'shared/components/QuantityButtonModal/QuantityButtonModal';

import styles from './ModalProductsInBasket.module.scss';

const ModalProductsInBasket = () => {
  return (
    <div>
      <Modal>
        <Heading>Товари у кошику</Heading>
        <QuantityButtonModal />
        <QuantityButtonModal />
        <div className={styles.textTotal}>
          <h3 className={styles['text-sum']}>Загальна сума:</h3>
          <p className={styles.total}>
            0<span>₴</span>
          </p>
        </div>
        <div className={styles.wrapperButton}>
          <Button mode="outlined" size="lg">
            Повернутись до покупок
          </Button>
          <Button mode="primary" size="lg">
            Оформити замовлення
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default ModalProductsInBasket;
