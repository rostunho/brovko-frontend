import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAllProducts } from 'redux/products/productsOperations';
import { fetchReviews } from 'redux/reviews/reviewsOperations';
import { fetchCategories } from 'redux/categories/categoriesOperations';
import { setSearchTerm } from 'redux/search/searchSlice';
import { getAllProducts } from 'redux/products/productsSelectors';
import { getAllCategories } from 'redux/categories/categoriesSelectors';
import { getSearchTerm } from 'redux/search/searchSelectors';

import Heading from 'shared/components/Heading/Heading';
import Pagination from 'components/Products/Pagination';
import ProductList from 'components/Products/ProductsList/ProductsList';
import SearchBar from 'shared/components/SearchBar/SearchBar';
import Filter from 'components/Filter/Filter';
// import styles from './ProductListPage.module.scss';

export default function ProductListPage() {
  // console.log('RENDER PRODUCT LIST PAGE');

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [forceRender, setForceRender] = useState(false);

  const products = useSelector(getAllProducts);
  const allCategories = useSelector(getAllCategories);
  const searchTerm = useSelector(getSearchTerm);
  // console.log('searchTerm', searchTerm);

  const categories = [
    { name: 'Всі категорії', id: 'all' },
    ...allCategories.items.map(({ _id, id, name }) => ({ name, id })),
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    !forceRender && dispatch(fetchAllProducts(page));
  }, [dispatch, forceRender, page]);

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

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    console.log('forceRender after fetch :', forceRender);
    setForceRender(false);
  }, [forceRender]);

  // обробкa події відправки форми
  const handleSearchSubmit = formData => {
    dispatch(setSearchTerm(formData.search)); // Оновити стан пошуку
  };

  function refetchProducts() {
    console.log('forceRender before fetch :', forceRender);
    console.log('REFETCH WORKING');
    dispatch(fetchAllProducts());
    setForceRender(true);
  }

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
        return b?.createdAt?.localeCompare(a.createdAt);
      });
    }
  }
  // console.log('sortedProducts', sortedProducts);

  return (
    <>
      <Heading withGoBack>Крамничка</Heading>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Filter
        categories={categories}
        onCategorySelect={setSelectedCategory}
        onSortingSelect={setSelectedSortingOption}
      />
      <ProductList
        products={products}
        onSubmit={handleSearchSubmit}
        sortedProducts={sortedProducts}
        refetchProducts={refetchProducts}
      />
      <Pagination page={page} onChangePage={handleChangePage} />
    </>
  );
}
