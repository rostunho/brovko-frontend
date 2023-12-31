import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from 'redux/basket/basketSlice';
import { Link, useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import { getAllOrders } from 'redux/basket/basketSelectors';
import { getProductById } from 'shared/services/api';
import { addPopupOperation } from 'redux/popup/popupOperations';

import StarEmpty from 'shared/icons/StarEmpty';
import Button from 'shared/components/Button/Button';
import Image from 'shared/components/Image';
import Input from 'shared/components/Input';

import styles from './ProductsItem.module.scss';

const ProductsItem = ({
  product,
  onChange,
  userStatus,
  adminInCustomerMode,
}) => {
  // const [product, setProduct] = useState(null);
  const [cardIsSelected, setCardIsSelected] = useState(false);

  // const { productId } = useParams();
  // console.log('useParams', productId);

  // const location = useLocation();
  // const from = location.state?.from || '/';
  // const navigate = useNavigate();

  const orders = useSelector(getAllOrders);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   getProductById(productId).then(product => setProduct(product));
  // }, [productId]);

  useEffect(() => {
    onChange && onChange(product.id, cardIsSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardIsSelected]);

  const handleCardSelecting = () => {
    setCardIsSelected(!cardIsSelected);
  };

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
    <div
      className={`${styles.productCard} ${
        cardIsSelected ? styles['productCard--selected'] : ''
      }`}
    >
      <div className={styles.image}>
        {(userStatus === 'manager' || userStatus === 'superadmin') &&
          !adminInCustomerMode && (
            <div className={styles['checkbox-backdrop']}>
              <Input
                type="checkbox"
                className={styles.checkbox}
                inputClassName={styles['checkbox-input']}
                value={cardIsSelected}
                onChange={handleCardSelecting}
              />
            </div>
          )}
        <Image src={product.picture} className={styles.picture} />
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
