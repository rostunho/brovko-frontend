import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getAllProducts,
  getAllCategories,
  getProductsByCategory,
} from 'shared/services/api';

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
import Pagination from 'components/Products/Pagination';
import ProductList from 'components/Products/ProductsList/ProductsList';
import SearchBar from 'shared/components/SearchBar/SearchBar';
import Filter from 'components/Filter/Filter';
import { sortingFunctions } from './sortingFunctions';
// import styles from './ProductListPage.module.scss';

export default function ProductListPage() {
  // console.log('RENDER PRODUCT LIST PAGE');

  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [defaultCategory, setDefaultCategory] = useState({
    name: 'Всі категорії',
    id: 'all',
  });
  const [selectedCategory, setSelectedCategory] = useState({
    name: 'Всі категорії',
  });

  // const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]);

  // const [forceRender, setForceRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const products = useSelector(getAllProducts);
  // const searchTerm = useSelector(getSearchTerm);
  // const filteredProductsByKeywords = useSelector(getProductsByKeywords);
  // const allCategories = useSelector(getAllCategories);
  // const filteredProductsByCategory = useSelector(getProductsByCategory);

  // const categories = [
  //   { name: 'Всі категорії', id: 'all' },
  //   ...(allCategories && allCategories.items
  //     ? allCategories.items.map(({ _id, id, name }) => ({ name, id }))
  //     : []),
  // ];

  // const dispatch = useDispatch();

  // просто console.log
  // useEffect(() => {
  //   console.log('currentProducts into ProductListPage :>> ', currentProducts);
  //   console.log(
  //     'currentCategories into ProductListPage :>> ',
  //     currentCategories
  //   );
  // }, [currentProducts, currentCategories]);

  // при першому рендері сторінки
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // встановлюємо, як актуальні, УСІ продукти з бази даних
      const { products, totalPages } = await getAllProducts();
      setCurrentProducts([...products]);
      // встановлюємо, як актуальні, УСІ категорії з бази даних
      const { categories } = await getAllCategories();
      setCurrentCategories([...categories]);
      // встановлюємо дефолтну кількість продуктів на одній сторінці пагінації (поки динамічно не змінюємо)
      setTotalPages(totalPages);
      setIsLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // при зміні сторінки пагінації беремо з бази даних потрібну "порцію" продуктів
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { products } = await getAllProducts(page);
      setCurrentProducts([...products]);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!selectedCategory.id) {
      // console.log('SELECTED CATEGORY ID >>:', selectedCategory.id);
      return;
    }
    (async () => {
      setIsLoading(true);
      if (selectedCategory.id === 'all') {
        const { products } = await getAllProducts(page);
        setCurrentProducts([...products]);
      } else {
        const { products } = await getProductsByCategory(
          selectedCategory.id,
          page
        );
        setCurrentProducts([...products]);
      }
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // useEffect(() => {
  //   !forceRender && dispatch(fetchAllProducts(page));
  //   dispatch(fetchReviews());
  //   dispatch(fetchCategories());
  // }, [dispatch, forceRender, page]);

  // обробляємо клік по кнопці пагінації
  const handleChangePage = pageNumber => {
    setPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // useEffect(() => {
  //   setForceRender(false);
  // }, [forceRender]);

  // useEffect(() => {
  //   dispatch(fetchProductsByCategory({ categoryId: selectedCategory }));
  // }, [dispatch, selectedCategory]);

  // useEffect(() => {
  //   if (searchTerm) {
  //     dispatch(fetchProductsByKeywords({ search: searchTerm, page }));
  //   }
  // }, [dispatch, searchTerm, page]);

  // обробкa події відправки форми
  // const handleSearchSubmit = formData => {
  //   // dispatch(setSearchTerm(formData.search));
  //   setSearchTerm(formData.search);
  // };

  const handleCategorySelect = categoryId => {
    setSelectedCategory(categoryId);
  };

  const handleSortingSelect = option => {
    // setSelectedSortingOption(option);
  };

  function refetchProducts() {
    // console.log('forceRender before fetch :', forceRender);
    // console.log('REFETCH WORKING');
    // dispatch(fetchAllProducts());
    // setForceRender(true);
  }

  // const getFilteredProducts = () => {
  //   return filteredProductsByCategory || filteredProductsByKeywords;
  // };
  // const filteredProducts = getFilteredProducts();

  // сортування
  // const handleSortingSelect = option => {
  //   // setSelectedSortingOption(option);
  //   let productsToSort =
  //     getFilteredProducts.length > 0 ? [...getFilteredProducts] : [...products];
  //   productsToSort.sort(sortingFunctions[option]);
  //   setSortedProducts(productsToSort);
  // };

  //////////  updating ///////

  // console.log('RENDER: selectedCategory :>> ', selectedCategory);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '20px',
          marginBottom: '40px',
        }}
      >
        <button onClick={() => getAllProducts()}>TEST GET ALL PRODUCTS</button>
        <button onClick={() => getProductsByCategory(108)}>
          TEST GET PRODUCTS BY CATEGORY
        </button>
      </div>
      {/* <Heading withGoBack>Крамничка</Heading> */}
      {/* <SearchBar
        onSubmit={handleSearchSubmit}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      /> */}
      <Filter
        categories={currentCategories}
        // searchTerm={searchTerm}
        defaultCategory={defaultCategory}
        defaultOption={defaultCategory?.name}
        onCategorySelect={handleCategorySelect}
        onSortingSelect={handleSortingSelect}
      />
      <ProductList
        products={currentProducts}
        // onSubmit={handleSearchSubmit}
        // sortedProducts={sortedProducts.length > 0 ? sortedProducts : products}
        refetchProducts={refetchProducts}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        onChangePage={handleChangePage}
      />
    </>
  );
}
