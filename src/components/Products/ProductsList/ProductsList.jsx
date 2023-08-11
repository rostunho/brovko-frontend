import ProductsItem from '../ProductsItem';

import styles from './ProductsList.module.scss';

const ProductList = () => {
  return (
    <div className={styles.products}>
      <h2 className={styles.productsTitle}>Наші смаколики</h2>
      <ul className={styles.list}>
        <ProductsItem />
        <ProductsItem />
        <ProductsItem />
      </ul>
    </div>
  );
};

export default ProductList;
