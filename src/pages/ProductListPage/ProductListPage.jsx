import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getAllProducts,
  getAllCategories,
  getProductsByCategory,
} from 'shared/services/api';
import { sortingTemplate } from './sortingTemplate';

import { fetchAllProducts } from 'redux/products/productsOperations';
import { fetchReviews } from 'redux/reviews/reviewsOperations';
import { fetchCategories } from 'redux/categories/categoriesOperations';
import {
  fetchProductsByCategory,
  fetchProductsByKeywords,
} from 'redux/products/productsOperations';

// import { setSearchTerm } from 'redux/search/searchSlice';
// import {
//   getProductsByCategory,
//   getProductsByKeywords,
// } from 'redux/products/productsSelectors';
// import { getAllCategories } from 'redux/categories/categoriesSelectors';

import { getSearchTerm } from 'redux/search/searchSelectors';

import Loader from 'components/Loader';
import Heading from 'shared/components/Heading/Heading';
import Input from 'shared/components/Input';
import Selector from 'shared/components/Selector';
import ProductList from 'components/Products/ProductsList/ProductsList';
import SearchBar from 'shared/components/SearchBar/SearchBar';
import Filter from 'components/Filter/Filter';

// import styles from './ProductListPage.module.scss';

//

export default function ProductListPage() {
  // const [currentCategories, setCurrentCategories] = useState([]);

  // const [defaultCategory, setDefaultCategory] = useState({
  //   name: 'Всі категорії',
  //   id: 'all',
  // });
  const [searchBarValue, setSearchBarValue] = useState('');
  const [keyWord, setKeyWord] = useState('');
  const [currentCategories, setCurrentCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    name: 'Всі категорії старт',
    id: '',
  });
  const [refreshCategory, setRefreshCategory] = useState(false);
  const [selectedSortingOption, setSelectedSortingOption] = useState({
    name: 'Сортування',
    id: '',
  });
  const [firstRender, setFirstRender] = useState(true);

  console.log('refreshCategory :>> ', refreshCategory);
  // console.log('currentCategories :>> ', currentCategories);
  // console.log('selectedCategory :>> ', selectedCategory);
  // console.log('selectedSortingOption :>> ', selectedSortingOption);

  // const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  // const [sortedProducts, setSortedProducts] = useState([]);

  // const [forceRender, setForceRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // беремо з бази даних актуальні категорії товарів
  useEffect(() => {
    fetchAllCategories();
    setFirstRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // кожного разу скидаємо тумблер refreshCategory в значення за замовчуванням
  useEffect(() => {
    if (!refreshCategory) {
      return;
    }
    setRefreshCategory(false);
  }, [refreshCategory]);

  const handleKeyWord = async () => {
    setKeyWord(searchBarValue);
    // setSearchBarValue('');
    setRefreshCategory(true);
  };

  const fetchAllCategories = async () => {
    const { categories } = await getAllCategories();
    setCurrentCategories([...categories]);
  };

  return (
    <>
      <Heading withGoBack>Крамничка</Heading>
      <Input
        name="searchbar"
        type="search"
        value={searchBarValue}
        onChange={e => setSearchBarValue(e.target.value)}
        onClick={handleKeyWord}
      />
      <Selector
        name="categories"
        label=""
        data={currentCategories}
        fetchSelectorValue={setSelectedCategory}
        // defaultValue={{ name: 'Всі категорії Старт', id: '' }}
        defaultValue={
          firstRender
            ? selectedCategory
            : {
                name: 'Всі категорії старт',
                id: '',
              }
        }
        defaultOption={'Всі категорії'}
        refresh={refreshCategory}
      />
      <Selector
        name="sorting"
        label=""
        data={sortingTemplate}
        fetchSelectorValue={setSelectedSortingOption}
        defaultValue={selectedSortingOption}
      />

      <ProductList
        // products={currentProducts}
        // onSubmit={handleSearchSubmit}
        // sortedProducts={sortedProducts.length > 0 ? sortedProducts : products}
        // refetchProducts={refetchProducts}
        keyWord={keyWord}
        category={selectedCategory}
        sorting={selectedSortingOption}
      />
    </>
  );
}
