import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAllProducts } from 'redux/products/productsOperations';
import { fetchReviews } from 'redux/reviews/reviewsOperations';
import { getAllProducts } from 'redux/products/productsSelectors';

import Heading from 'shared/components/Heading/Heading';
import Pagination from 'components/Products/Pagination';
import ProductList from 'components/Products/ProductsList/ProductsList';
import SearchBar from 'shared/components/SearchBar/SearchBar';
import Filter from 'components/Filter/Filter';
// import styles from './ProductListPage.module.scss';

export default function ProductListPage() {
  const [page, setPage] = useState(1);
  // Стан для пошуку та фільтрації
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts(page));
  }, [dispatch, page]);

  const handleChangePage = pageNumber => {
    setPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const products = useSelector(getAllProducts);

  // обробкa події відправки форми
  const handleSearchSubmit = formData => {
    setSearchTerm(formData.search); // Оновити стан пошуку
  };

  // Фільтруємо продукти за пошуковим терміном та обраною категорією
  const filteredProducts = products.filter(product => {
    const nameMatch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!selectedCategory) {
      return nameMatch;
    }
    const categoryMatch = product.categoryId.includes(selectedCategory);
    return nameMatch && categoryMatch;
  });

  // сортування
  let sortedProducts = [...filteredProducts]; //копія масиву

  if (selectedSortingOption) {
    if (selectedSortingOption === 'Від дешевих до дорогих') {
      sortedProducts.sort((a, b) => {
        // console.log('a.price:', a.price, 'b.price:', b.price);
        return a.price - b.price;
      });
    } else if (selectedSortingOption === 'Від дорогих до дешевих') {
      sortedProducts.sort((a, b) => {
        // console.log('a.price:', a.price, 'b.price:', b.price);
        return b.price - a.price;
      });
    } else if (selectedSortingOption === 'За рейтингом') {
      sortedProducts.sort((a, b) => {
        // console.log('a.rating:', a.rating, 'b.rating:', b.rating);
        return b.rating - a.rating;
      });
    } else if (selectedSortingOption === 'Новинки') {
      sortedProducts.sort((a, b) => {
        // console.log('a.createdAt:', a.createdAt, 'b.createdAt:', b.createdAt);
        return b.createdAt.localeCompare(a.createdAt);
      });
    }
  }
  console.log('sortedProducts', sortedProducts);

  return (
    <>
      <Heading withGoBack>Крамничка</Heading>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Filter
        onCategorySelect={category => setSelectedCategory(category)}
        onSortingSelect={option => setSelectedSortingOption(option)}
      />
      <ProductList
        products={products}
        onSubmit={handleSearchSubmit}
        sortedProducts={sortedProducts}
      />
      <Pagination page={page} onChangePage={handleChangePage} />
    </>
  );
}
