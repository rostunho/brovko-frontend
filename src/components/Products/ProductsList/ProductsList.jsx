import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllProducts } from 'redux/products/productsSelectors';
import { fetchAllProducts } from 'redux/products/productsOperations';

import ProductsItem from '../ProductsItem';

import Swiper from 'components/Swiper/Swiper';

import styles from './ProductsList.module.scss';

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const { products } = useSelector(getAllProducts);
  console.log(products);

  return (
    <div className={styles.products}>
      <Swiper />
      <h2 className={styles.productsTitle}>Наші смаколики</h2>
      {products && (
        <ul className={styles.list}>
          {products.map(product => {
            return (
              <li key={product.id}>{<ProductsItem product={product} />}</li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
