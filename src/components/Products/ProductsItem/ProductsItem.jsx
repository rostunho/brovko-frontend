import StarEmpty from 'shared/icons/StarEmpty';
import Button from 'shared/components/Button/Button';

import styles from './ProductsItem.module.scss';

const ProductsItem = () => {
  return (
    <div className={styles.productCard}>
      <div className={styles.image}>Тут буде фотка смаколика</div>
      <div className={styles.description}>
        <div className={styles.info}>
          <div className={styles.textDesc}>
            <p className={styles.name}>Name</p>
            <p className={styles.price}>Price</p>
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