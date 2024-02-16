import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllCategories, getAllProducts } from 'shared/services/api';
import { sortingTemplate } from './sortingTemplate';
import Heading from 'shared/components/Heading/Heading';
import Input from 'shared/components/Input';
import Selector from 'shared/components/Selector';
import ProductList from 'components/Products/ProductsList/ProductsList';
import styles from './ProductListPage.module.scss';
import DoubleRangeSlider from 'shared/components/Input/InputRange/DoubleRangeSlider';
import Pagination from 'components/Products/Pagination';

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyWord = searchParams.get('key');
  const categoryId = searchParams.get('id');
  const categoryName = searchParams.get('name');

  console.log('categoryId :>> ', categoryId);

  const [products, setProducts] = useState([]);
  const [searchBarValue, setSearchBarValue] = useState('');
  // const [keyWord, setKeyWord] = useState('');
  const [currentCategories, setCurrentCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState({
  //   name: searchParams.get('name') || 'Всі категорії (дефолт)',
  //   id: searchParams.get('id') || 'all',
  // });
  const [refreshCategory, setRefreshCategory] = useState(false);
  const [selectedSortingOption, setSelectedSortingOption] = useState({
    id: 0,
    name: 'Сортування',
    order: 'desc',
    field: 'createdAt',
  });
  const [categorySelectorIsOpen, setCategorySelectorIsOpen] = useState(false);
  const [sortingSelectorIsOpen, setSortingSelectorIsOpen] = useState(false);
  // const [refreshProducts, setRefreshProducts] = useState(false);
  const [initialPrices, setInitialPrices] = useState({
    maxPrice: 100,
    minPrice: 0,
  });
  const [selectedPrices, setSelectedPrices] = useState({
    maxPrice: '',
    minPrice: '',
  });
  const [page, setPage] = useState(1);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (!firstRender) {
      return;
    }

    (async () => {
      await fetchCategories();
      await fetchProducts();
      initialProcessing(searchParams);
    })();
    setFirstRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // якщо це перший рендер - уникаємо дублювання запиту, якщо id категорії "all" - значить ми повернулись на "всі категорії" з іншої категорії
    if (firstRender || !categoryId) {
      return;
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const handleCategory = data => {
    setSearchParams(
      prevSearchParams => {
        prevSearchParams.set('id', data.id);
        prevSearchParams.set('name', data.name);
        return prevSearchParams;
      },
      { replace: true }
    );
  };

  const fetchCategories = async () => {
    try {
      const { categories } = await getAllCategories();
      setCurrentCategories([...categories]);
      return categories;
    } catch (error) {
      console.log('Не отримано категорій', error);
    }
  };

  const fetchProducts = async () => {
    (async () => {
      try {
        const response = await getAllProducts({ categoryId: categoryId });
        setProducts(response);
      } catch (error) {
        console.log('Не отримано продуктів', error);
      }
    })();
  };

  const getKeyWordFromSearchParams = keyWord => {
    setSearchBarValue(keyWord);
    // setKeyWord(keyWord);
  };

  const setKeyWordToSearchParams = keyWord => {
    setSearchParams(
      prevSearchParams => {
        prevSearchParams.set('key', keyWord);
        return prevSearchParams;
      },
      { replace: true }
    );
  };

  // const getCategoryFromSearchParams = (id, name) => {
  //   setSelectedCategory({ id: id, name: name });
  // };

  const setCategoryToSearchParams = (id, name) => {
    setSearchParams(
      prevSearchParams => {
        prevSearchParams.set('id', id);
        prevSearchParams.set('name', name);
        return prevSearchParams;
      },
      { replace: true }
    );
  };

  const initialProcessing = params => {
    const { key, id, name, by, order, min, max, page, limit } =
      Object.fromEntries(params);

    key ? getKeyWordFromSearchParams(key) : setKeyWordToSearchParams('');
    !id && !name && setCategoryToSearchParams('', 'Всі категорії (дефолт 2)');

    // catId ?
  };

  // // беремо з бази даних актуальні категорії товарів
  // useEffect(() => {
  //   (async () => {
  //     const savedCategories = await fetchAllCategories();
  //     searchParamsProcessing(savedCategories);
  //     // setFirstRender(false);
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // // обнуляємо ключове слово при зміні категорії
  // useEffect(() => {
  //   // if (firstRender) {
  //   //   return;
  //   // }
  //   // setSearchBarValue('');
  //   // setKeyWord('');
  //   setSearchParams({
  //     key: keyWord,
  //     category: selectedCategory.id,
  //     sort: selectedSortingOption.field,
  //     order: selectedSortingOption.order,
  //     max: selectedPrices.maxPrice,
  //     min: selectedPrices.minPrice,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedCategory, keyWord, selectedSortingOption, selectedPrices]);

  // // кожного разу скидаємо тумблер refreshCategory в значення за замовчуванням
  // useEffect(() => {
  //   if (!refreshCategory) {
  //     return;
  //   }
  //   setRefreshCategory(false);
  // }, [refreshCategory]);

  // useEffect(() => {
  //   if (!refreshProducts) {
  //     return;
  //   }
  //   setRefreshProducts(false);
  // }, [refreshProducts]);

  const handleKeyWord = async () => {
    // setKeyWord(searchBarValue);
    setSearchParams(
      prevSearchParams => {
        prevSearchParams.set('key', searchBarValue);
        prevSearchParams.set('id', 'all');
        prevSearchParams.set('name', '');

        return prevSearchParams;
      },
      { replace: true }
    );

    // setSelectedCategory({
    //   name: 'Всі категорії (після скидання ключового слова)',
    //   id: 'all',
    // });
    // setSearchBarValue('');
    // setRefreshCategory(true);
    // searchBarValue === '' && setRefreshProducts(true);
  };

  // const fetchAllCategories = async () => {
  //   const { categories } = await getAllCategories();
  //   setCurrentCategories([...categories]);
  //   return categories;
  // };

  const toggleCloseCategorySelector = () => {
    if (sortingSelectorIsOpen) {
      setSortingSelectorIsOpen(false);
    }

    setCategorySelectorIsOpen(!categorySelectorIsOpen);
  };

  const toggleCloseSortingSelector = () => {
    if (categorySelectorIsOpen) {
      setCategorySelectorIsOpen(false);
    }

    setSortingSelectorIsOpen(!sortingSelectorIsOpen);
  };

  const clearSearchBar = () => {
    setSearchBarValue('');
    // setKeyWord('');
    setSearchParams(
      prevSearchParams => {
        console.log('prevSearchParams :>> ', prevSearchParams);
        prevSearchParams.set('key', '');
        return prevSearchParams;
      },
      { replace: true }
    );
  };

  const handleSliderSubmit = (minPrice, maxPrice) => {
    setSelectedPrices({ minPrice, maxPrice });
  };

  const handleChangePage = pageNumber => {
    setPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* <Loader /> */}
      <Heading withGoBack>Крамничка</Heading>
      <Input
        name="searchbar"
        label=""
        type="search"
        value={searchBarValue}
        onChange={e => setSearchBarValue(e.target.value)}
        onClick={handleKeyWord}
      />
      <div className={styles['selectors-container']}>
        <Selector
          name="categories"
          label=""
          data={currentCategories}
          // fetchSelectorValue={setSelectedCategory}
          fetchSelectorValue={handleCategory}
          defaultValue={{
            id: categoryId,
            name: categoryName,
          }}
          defaultOption={'Всі категорії'}
          refresh={refreshCategory}
          onClick={toggleCloseCategorySelector}
          onOptionClick={clearSearchBar}
          forceClosing={sortingSelectorIsOpen}
        />
        <Selector
          name="sorting"
          label=""
          data={sortingTemplate}
          fetchSelectorValue={setSelectedSortingOption}
          defaultValue={selectedSortingOption}
          onClick={toggleCloseSortingSelector}
          forceClosing={categorySelectorIsOpen}
        />
      </div>
      <DoubleRangeSlider
        onSubmit={handleSliderSubmit}
        min={initialPrices?.minPrice}
        max={initialPrices?.maxPrice}
        keyword={keyWord}
      />

      {products?.products && (
        <>
          <ProductList
            products={products.products}
            // page={products.page}
            totalPages={products.totalPages}
            searchValue={keyWord}
            // category={selectedCategory}
            sorting={selectedSortingOption}
            // refresh={refreshProducts}
            prices={selectedPrices}
            onProductsChange={setInitialPrices}
          />
          <Pagination
            page={page}
            totalPages={products.totalPages}
            onChangePage={handleChangePage}
          />
        </>
      )}
    </>
  );
}
