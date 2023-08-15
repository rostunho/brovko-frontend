import StarEmpty from 'shared/icons/StarEmpty';
import Button from 'shared/components/Button/Button';

import styles from './ProductsItem.module.scss';

const ProductsItem = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.image}>
        {product.picture ? (
          <img src={product.picture} className={styles.img} alt="Product" />
        ) : (
          <p> тут буде фото смаколика</p>
        )}
      </div>
      <div className={styles.description}>
        <div className={styles.info}>
          <div className={styles.textDesc}>
            <p className={styles.name}>{product.name}</p>
            <p className={styles.price}>{product.price}</p>
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
          <Button mode="outlined">Подробиці</Button>
          <Button mode="primary">В кошик</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsItem;
