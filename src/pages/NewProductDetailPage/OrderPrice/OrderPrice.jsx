import { useState } from 'react';
import QuantityButtons from 'shared/components/QuantityButtonModal/QuantityButtons';
import Button from 'shared/components/Button';
import styles from './OrderPrice.module.scss';

export default function OrderPrice({ product, className, ...props }) {
  const [quantity, setQuantity] = useState(1);

  const isMobile = false;

  return (
    <div className={`${styles.container} ${className ? className : ''}`}>
      <div className={styles.price}>
        <h3 className={`${styles.title} ${isMobile ? styles.mobile : ''}`}>
          Ціна:
        </h3>
        <p className={`${styles.title} `}> {product.price} ₴</p>
      </div>
      <h3 className={`${styles.title} ${isMobile ? styles.mobile : ''}`}>
        Кількість:
      </h3>
      <div className={styles.quantity}>
        <QuantityButtons
          className={`${styles.counter} `}
          value={quantity}
          setValue={setQuantity}
        />
      </div>
      <Button size="lg">ADD TO CART</Button>
    </div>
  );
}
