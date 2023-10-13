import Button from 'shared/components/Button';

import styles from './ModalBasketIsEmpty.module.scss';

const ModalBasketIsEmpty = ({ hendlClickReturn }) => {
  return (
    <div>
      <p className={styles.text}>Ваш кошик порожній</p>
      <div className={styles.wrapperButton}>
        <Button
          onClick={hendlClickReturn}
          mode="primary"
          size="lg"
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
    </div>
  );
};
export default ModalBasketIsEmpty;
