import Button from 'shared/components/Button';

import styles from './ModalOrderSuccess.module.scss';

const ModalOrderSuccess = ({ hendlClickReturn }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Ваш заказ їде до Вас</p>
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

export default ModalOrderSuccess;
