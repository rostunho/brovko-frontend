import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllProducts } from 'redux/products/productsSelectors';
import { fetchAllProducts } from 'redux/products/productsOperations';

import ProductsItem from '../ProductsItem';
import Heading from 'shared/components/Heading/Heading';
import SearchBar from 'shared/components/SearchBar/SearchBar';

import styles from './ProductsList.module.scss';

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const { products } = useSelector(getAllProducts);
  // console.log(products);

  // обробкa події відправки форми
  const handleSearchSubmit = formData => {
    //викликати серверний запит для пошуку
    console.log('Form data submitted:', formData);
  };

  return (
    <div className={styles.products}>
      <Heading withGoBack>Наші смаколики</Heading>
      <SearchBar onSubmit={handleSearchSubmit} />
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
