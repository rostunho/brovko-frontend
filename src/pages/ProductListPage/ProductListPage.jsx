import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchAllProducts } from 'redux/products/productsOperations';

import Pagination from 'components/Products/Pagination';
import ProductList from 'components/Products/ProductsList/ProductsList';
import styles from './ProductListPage.module.scss';

export default function ProductListPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <>
      <ProductList />
      <Pagination />
    </>
  );
}
