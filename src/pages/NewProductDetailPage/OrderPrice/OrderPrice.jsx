import { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from 'redux/basket/basketSelectors';
import { changeQuantity } from 'redux/basket/basketSlice';
import { useScreen } from 'shared/hooks/useScreen';
import QuantityButtons from 'shared/components/QuantityButtonModal/QuantityButtons';
import Button from 'shared/components/Button';
import ModalProductsInBasket from 'components/ModalProductsInBasket/ModalProductsInBasket';
import styles from './OrderPrice.module.scss';
import useProductInBasket from 'shared/hooks/useProductInBasket';
import { useNavigate } from 'react-router-dom';

// export default function OrderPrice({ product, className, ...props })

const OrderPrice = forwardRef(({ product, className, ...props }, ref) => {
  const { handleAddToCart, showBascketOrders } = useProductInBasket();
  const products = showBascketOrders();

  const currentOrders = useSelector(getAllOrders);
  const [quantity, setQuantity] = useState(1);
  const [showBasket, setShowBasket] = useState(false);
  const productInBasket = products.find(el => el._id === product._id);
  const { screenWidth } = useScreen();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   currentOrders.length ? setQuantity(currentOrders.length) : setQuantity(1);
  // }, [currentOrders]);

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

    handleAddToCart({ product, value: quantity });
    setShowBasket(true);
  };

  return (
    <div
      ref={ref}
      className={`${styles['price-container']} ${className ? className : ''}`}
    >
      <div className={styles.price}>
        <h3
          className={`${styles.title} ${
            screenWidth < 400 ? styles.mobile : ''
          }`}
          aria-hidden="false"
        >
          Ціна:
        </h3>
        <p className={`${styles.title} `}> {product.price} ₴</p>
      </div>
      {product.quantityInStock > 0 ? (
        <div className={styles.quantity}>
          <h3
            className={`${styles.title} ${
              screenWidth < 400 ? styles.mobile : ''
            }`}
            aria-hidden="false"
          >
            Кількість:
          </h3>
          <div className={styles.quantity}>
            <QuantityButtons
              className={`${styles.counter} `}
              valueClassName={styles['counter-value']}
              value={quantity}
              setValue={setQuantity}
              quantityInStock={product.quantityInStock}
            />
          </div>
        </div>
      ) : (
        <div className={styles.notAvailable}>Немає в наявності</div>
      )}
      {product.quantityInStock !== 0 ? (
        <Button
          size="lg"
          onClick={addProductToBasket}
          className={styles['add-button']}
        >
          {productInBasket ? 'Видалити з кошика' : 'Додати в кошик'}
        </Button>
      ) : (
        <Button size="lg" onClick={() => navigate('/all/contacts')}>
          Зв'язатися з менеджером
        </Button>
      )}
      {showBasket && (
        <ModalProductsInBasket closeModal={() => setShowBasket(false)} />
      )}
    </div>
  );
});

export default OrderPrice;
