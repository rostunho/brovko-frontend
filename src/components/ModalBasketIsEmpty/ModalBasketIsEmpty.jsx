import Button from 'shared/components/Button';

import Modal from 'shared/components/Modal/Modal';

import styles from './ModalBasketIsEmpty.module.scss';

const ModalBasketIsEmpty = () => {
  return (
    <div>
      <Modal>
        <p className={styles.text}>Ваш кошик порожній</p>
        <div className={styles.wrapperButton}>
          <Button
            mode="primary"
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            Повернутись до покупок
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default ModalBasketIsEmpty;
