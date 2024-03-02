// import { useDispatch, useSelector } from 'react-redux';
import Button from 'shared/components/Button';
// import { deleteOrder } from 'redux/basket/basketSlice';
// import { deleteOrderUser } from 'redux/user/userSlice';

import useProductInBasket from 'shared/hooks/useProductInBasket';
// import { selectIsLogin } from 'redux/user/userSelectors';

import styles from './ModalDelete.module.scss';

const ModalDelete = ({ setModalDelete, orderId }) => {
  console.log('orderId', orderId);
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
