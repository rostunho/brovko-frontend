
import Button from 'shared/components/Button';

import useProductInBasket from 'shared/hooks/useProductInBasket';


import styles from './ModalDelete.module.scss';

const ModalDelete = ({ setModalDelete, orderId }) => {
  const { hahdleBasketDel, hahdleBasketClose } = useProductInBasket();

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Видалити цей товар з кошику?</p>
      <div className={styles.wrapperButton}>
        <Button
          mode="outlined"
          onClick={() => hahdleBasketClose({ setModalDelete })}
        >
          Скасувати
        </Button>
        <Button
          mode="primary"
          onClick={() => hahdleBasketDel({ setModalDelete, orderId })}
        >
          Так
        </Button>
      </div>
    </div>
  );
};
export default ModalDelete;
