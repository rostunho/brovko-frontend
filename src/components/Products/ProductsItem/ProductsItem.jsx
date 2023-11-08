import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from 'redux/basket/basketSlice';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getAllOrders } from 'redux/basket/basketSelectors';
import StarEmpty from 'shared/icons/StarEmpty';
import Button from 'shared/components/Button/Button';
import Image from 'shared/components/Image';

import styles from './ProductsItem.module.scss';
import { addPopupOperation } from 'redux/popup/popupOperations';

const ProductsItem = ({ product }) => {
  const orders = useSelector(getAllOrders);
  const location = useLocation();

  const dispatch = useDispatch();

  const handleAddPopup = text => {
    dispatch(addPopupOperation(text));
  };

  const handleAddToCart = () => {
    const result = orders.some(order => order._id === product._id);
    if (result) {
      handleAddPopup('Товар вже знаходиться в кошику');
      return;
    }
    dispatch(addOrder({ ...product, value: 1 }));
    dispatch(addPopupOperation('Товар додано в кошик'));
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.image}>
        <Image src={product.picture} />
      </div>

      <div className={styles.description}>
        <div className={styles.info}>
          <div className={styles.textDesc}>
            <p className={styles.name}>{product.name}</p>
            <p className={styles.price}>{product.price} грн</p>
          </div>
          <div className={styles.rating}>
            <StarEmpty />
            <StarEmpty />
            <StarEmpty />
            <StarEmpty />
            <StarEmpty />
          </div>
        </div>
        <div className={styles.buttons}>
          <Link
            to={`/shop/product/${product._id}`}
            // state={{ from: location.state?.from } ?? '/'}
            state={{ from: '/shop/product-list-page' }}
          >
            <Button mode="outlined">Подробиці</Button>
          </Link>

          <Button onClick={handleAddToCart} mode="primary">
            В кошик
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsItem;
