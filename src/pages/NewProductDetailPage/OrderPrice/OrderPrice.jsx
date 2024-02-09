import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from 'redux/basket/basketSelectors';
import { addOrder, changeQuantity } from 'redux/basket/basketSlice';
import QuantityButtons from 'shared/components/QuantityButtonModal/QuantityButtons';
import Button from 'shared/components/Button';
import ModalProductsInBasket from 'components/ModalProductsInBasket/ModalProductsInBasket';
import styles from './OrderPrice.module.scss';

export default function OrderPrice({ product, className, ...props }) {
  const currentOrders = useSelector(getAllOrders);
  const [quantity, setQuantity] = useState(currentOrders.length || 1);
  const [showBasket, setShowBasket] = useState(false);
  const productInBasket = currentOrders.find(el => el._id === product._id);
  const dispatch = useDispatch();

  const isMobile = true;

  useEffect(() => {
    currentOrders.length ? setQuantity(currentOrders.length) : setQuantity(1);
  }, [currentOrders]);

  useEffect(() => {
    if (!productInBasket) {
      return;
    }

    setQuantity(productInBasket.value);
  }, [currentOrders, productInBasket]);

  useEffect(() => {
    if (!productInBasket) {
      return;
    }
    dispatch(changeQuantity({ id: productInBasket._id, value: quantity }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const addProductToBasket = () => {
    if (productInBasket) {
      setShowBasket(true);
      return;
    }

    dispatch(addOrder({ ...product, value: quantity }));
    setShowBasket(true);
  };

  return (
    <div
      className={`${styles['price-container']} ${className ? className : ''}`}
    >
      <div className={styles.price}>
        <h3
          className={`${styles.title} ${isMobile ? styles.mobile : ''}`}
          // aria-hidden="false"
        >
          Ціна:
        </h3>
        <p className={`${styles.title} `}> {product.price} ₴</p>
      </div>
      <div className={styles.quantity}>
        <h3
          className={`${styles.title} ${isMobile ? styles.mobile : ''}`}
          // aria-hidden="false"
        >
          Кількість:
        </h3>
        <div className={styles.quantity}>
          <QuantityButtons
            className={`${styles.counter} `}
            value={quantity}
            setValue={setQuantity}
          />
        </div>
      </div>
      <Button size="lg" onClick={addProductToBasket}>
        {productInBasket ? 'Видалити з кошика' : 'Додати в кошик'}
      </Button>
      {showBasket && (
        <ModalProductsInBasket closeModal={() => setShowBasket(false)} />
      )}
    </div>
  );
}
