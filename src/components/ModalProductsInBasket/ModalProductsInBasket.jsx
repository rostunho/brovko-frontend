import Button from 'shared/components/Button';

import Modal from 'shared/components/Modal/Modal';

import styles from './ModalProductsInBasket.module.scss';

const ModalProductsInBasket = () => {
  return (
    <div>
      <Modal>
        <h2 className={styles.title}>Товари у кошику</h2>
        <div className={styles.wrapperProducts}></div>
        <div className={styles.textTotal}>
          <h3 className={styles.text}>Загальна сума:</h3>
          <p className={styles.total}>
            0<span>₴</span>
          </p>
        </div>
        <div className={styles.wrapperButton}>
          <Button
            mode="outlined"
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            Повернутись до покупок
          </Button>
          <Button
            mode="primary"
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            Оформити замовлення
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default ModalProductsInBasket;
