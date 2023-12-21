import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAllProducts } from 'redux/products/productsOperations';
import { fetchReviews } from 'redux/reviews/reviewsOperations';
import { fetchCategories } from 'redux/categories/categoriesOperations';
import {
  fetchProductsByCategory,
  fetchProductsByKeywords,
} from 'redux/products/productsOperations';

import { setSearchTerm } from 'redux/search/searchSlice';
import {
  getAllProducts,
  getProductsByCategory,
  getProductsByKeywords,
} from 'redux/products/productsSelectors';
import { getAllCategories } from 'redux/categories/categoriesSelectors';
import { getSearchTerm } from 'redux/search/searchSelectors';

import Heading from 'shared/components/Heading/Heading';
import Pagination from 'components/Products/Pagination';
import ProductList from 'components/Products/ProductsList/ProductsList';
import SearchBar from 'shared/components/SearchBar/SearchBar';
import Filter from 'components/Filter/Filter';
import { sortingFunctions } from './sortingFunctions';
// import styles from './ProductListPage.module.scss';

export default function ProductListPage() {
  // console.log('RENDER PRODUCT LIST PAGE');

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]);

  const [searchCleared, setSearchCleared] = useState(false);


  const [forceRender, setForceRender] = useState(false);

  const products = useSelector(getAllProducts);
  const searchTerm = useSelector(getSearchTerm);
  const filteredProductsByKeywords = useSelector(getProductsByKeywords);
  const allCategories = useSelector(getAllCategories);
  const filteredProductsByCategory = useSelector(getProductsByCategory);

  const categories = [
    { name: 'Всі категорії', id: 'all' },
    ...(allCategories && allCategories.items
      ? allCategories.items.map(({ _id, id, name }) => ({ name, id }))
      : []),
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    !forceRender && dispatch(fetchAllProducts(page));
    dispatch(fetchReviews());
    dispatch(fetchCategories());
  }, [dispatch, forceRender, page]);

  const handleChangePage = pageNumber => {
    setPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    console.log('forceRender after fetch :', forceRender);
    setForceRender(false);
  }, [forceRender]);

  useEffect(() => {
    dispatch(fetchProductsByCategory({ categoryId: selectedCategory }));
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchProductsByKeywords({ search: searchTerm, page }));
    }
  }, [dispatch, searchTerm, page]);


  // обробкa події відправки форми
  const handleSearchSubmit = formData => {
    dispatch(setSearchTerm(formData.search));
    setSearchTerm(formData.search);
  };

  const handleCategorySelect = categoryId => {
    setSelectedCategory(categoryId);
    setSearchCleared(true);
  };

  // const handleSortingSelect = option => {
  //   setSelectedSortingOption(option);
  // };

  function refetchProducts() {
    // console.log('forceRender before fetch :', forceRender);
    // console.log('REFETCH WORKING');
    dispatch(fetchAllProducts());
    setForceRender(true);
  }

  const getFilteredProducts = () => {
    return filteredProductsByCategory || filteredProductsByKeywords;
  };
  const filteredProducts = getFilteredProducts();

  // сортування
  const handleSortingSelect = option => {
    setSelectedSortingOption(option);
    let productsToSort =
      getFilteredProducts.length > 0 ? [...getFilteredProducts] : [...products];
    productsToSort.sort(sortingFunctions[option]);
    setSortedProducts(productsToSort);
  };

  console.log('sortedProducts', sortedProducts);

  return (
    <>
      <Heading withGoBack>Крамничка</Heading>
      <SearchBar onSubmit={handleSearchSubmit} selectedCategory={selectedCategory}/>
      <Filter
        categories={categories}
        searchTerm={searchTerm}
        onCategorySelect={handleCategorySelect}
        onSortingSelect={handleSortingSelect}
      />
      <ProductList
        products={filteredProducts}
        onSubmit={handleSearchSubmit}
        sortedProducts={sortedProducts.length > 0 ? sortedProducts : products}
        refetchProducts={refetchProducts}
      />
      <Pagination page={page} onChangePage={handleChangePage} />
    </>
  );
}
