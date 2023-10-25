import { useDispatch } from 'react-redux';
import Button from 'shared/components/Button';
import { deleteOrder } from 'redux/basket/basketSlice';

import styles from './ModalDelete.module.scss';

const ModalDelete = ({ setModalDelete, orderId }) => {
  const dispatch = useDispatch();

  const hahdleBasketDel = () => {
    dispatch(deleteOrder(orderId));
    setModalDelete(false);
  };

  const hahdleBasketClose = () => {
    setModalDelete(false);
  };

  return (
    <div>
      <p className={styles.text}>Видалити цей товар з кошику?</p>
      <div className={styles.wrapperButton}>
        <Button mode="outlined" onClick={hahdleBasketClose}>
          Скасувати
        </Button>
        <Button mode="primary" onClick={hahdleBasketDel}>
          Так
        </Button>
      </div>
    </div>
  );
};
export default ModalDelete;
