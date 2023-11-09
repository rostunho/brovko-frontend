import ProductsItem from '../ProductsItem';
import styles from './ProductsList.module.scss';

const ProductList = ({ products, sortedProducts }) => {
  if (!products) {
    return null;
  }

  return (
    <div className={styles.products}>
      {sortedProducts.length > 0 ? (
        <ul className={styles.list}>
          {sortedProducts.map(product => (
            <li key={product._id}>
              <ProductsItem product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Нічого не знайдено</p>
      )}
    </div>
  );
};

export default ProductList;
