import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchAllProducts } from 'redux/products/productsOperations';
import { fetchReviews } from 'redux/reviews/reviewsOperations';

import Heading from 'shared/components/Heading/Heading';
import Pagination from 'components/Products/Pagination';
import ProductList from 'components/Products/ProductsList/ProductsList';
// import styles from './ProductListPage.module.scss';

export default function ProductListPage() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts(page));
  }, [dispatch, page]);

  const handleChangePage = pageNumber => {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <>
      <Heading withGoBack>Крамничка</Heading>
      <ProductList />
      <Pagination page={page} onChangePage={handleChangePage} />
    </>
  );
}
