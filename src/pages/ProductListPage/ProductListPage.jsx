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
  const categoryName = searchParams.get('name'); // потрібна лише для дефолтного виявлення категорії при вставленні урли в нове вікно без повторних рендерів
  const sortingBy = searchParams.get('by');
  const sortingOrder = searchParams.get('order');
  const priceMin = searchParams.get('min');
  const priceMax = searchParams.get('max');

  const [products, setProducts] = useState([]);
  const [searchBarValue, setSearchBarValue] = useState('');
  const [sortingToShow, setSortingToShow] = useState({
    id: 0,
    name: 'Сортування',
  });
  // const [keyWord, setKeyWord] = useState('');
  const [currentCategories, setCurrentCategories] = useState([]);

  // const [refreshCategory, setRefreshCategory] = useState(false);
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

  useEffect(() => {
    if (firstRender || keyWord === '') {
      return;
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyWord]);

  useEffect(() => {
    if (firstRender || sortingToShow?.id === 0) {
      // sortingToShow.id === 0 лише при першому рендері
      return;
    }

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortingBy, sortingOrder]);

  useEffect(() => {
    if (firstRender || !priceMin || !priceMax) {
      return;
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceMin, priceMax]);

  const handleCategory = data => {
    setSearchParams(
      existingSearchParams => {
        existingSearchParams.set('id', data.id);
        existingSearchParams.set('name', data.name);
        return existingSearchParams;
      },
      { replace: true }
    );
  };

  const handleKeyWord = async () => {
    // setKeyWord(searchBarValue);
    setSearchParams(
      existingSearchParams => {
        existingSearchParams.set('key', searchBarValue);
        existingSearchParams.set('id', 'all');
        existingSearchParams.set(
          'name',
          'Всі категорії (після зміни ключового слова)'
        );

        return existingSearchParams;
      },
      { replace: true }
    );
  };

  const handleSortingOptions = data => {
    setSortingToShow({ id: data.id, name: data.name });
    setSearchParams(
      existingSearchParams => {
        existingSearchParams.set('by', data.field);
        existingSearchParams.set('order', data.order);
        return existingSearchParams;
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
        const response = await getAllProducts({
          search: keyWord,
          categoryId: categoryId,
          sortBy: sortingBy,
          sortOrder: sortingOrder,
          priceMin: priceMin,
          priceMax: priceMax,
        });
        setProducts(response);
      } catch (error) {
        console.log('Не отримано продуктів', error);
      }
    })();
  };

  const getKeyWordFromSearchParams = keyWord => {
    setSearchBarValue(keyWord);
    // setKeyWord(keyWord);
  }; // Поки, ДУБЛЬ ФУНКЦІОНАЛУ

  const setKeyWordToSearchParams = keyWord => {
    setSearchParams(
      existingSearchParams => {
        existingSearchParams.set('key', keyWord);
        return existingSearchParams;
      },
      { replace: true }
    );
  };

  const setCategoryToSearchParams = (id, name) => {
    setSearchParams(
      existingSearchParams => {
        existingSearchParams.set('id', id);
        existingSearchParams.set('name', name);
        return existingSearchParams;
      },
      { replace: true }
    );
  };

  const getSortingOptionsFromSearchParams = (
    by,
    order,
    template = sortingTemplate
  ) => {
    if (order === 'createdAt' && order === 'desc') {
      setSortingToShow({ ...template[2] });
    } else if (by === 'createdAt' && order === 'asc') {
      setSortingToShow({ ...template[3] });
    } else if (by === 'price' && order === 'desc') {
      setSortingToShow({ ...template[0] });
    } else if (by === 'price' && order === 'asc') {
      setSortingToShow({ ...template[1] });
    }
  };

  const setSortingOptionsToSearchParams = (by, order) => {
    setSearchParams(
      existingSearchParams => {
        existingSearchParams.set('by', by);
        existingSearchParams.set('order', order);
        return existingSearchParams;
      },
      { replace: true }
    );
  };

  const setPricesToSearchParams = (min, max) => {
    setSearchParams(
      existingSearchParams => {
        existingSearchParams.set('min', min);
        existingSearchParams.set('max', max);
        return existingSearchParams;
      },
      { replace: true }
    );
  };

  const initialProcessing = params => {
    const { key, id, name, by, order, min, max, page, limit } =
      Object.fromEntries(params);

    key ? getKeyWordFromSearchParams(key) : setKeyWordToSearchParams('');

    !id && !name && setCategoryToSearchParams('', 'Всі категорії (дефолт 2)'); // не використовуємо get-функції, бо усі потрібні опції вже є в searchParams.get();

    by && order
      ? getSortingOptionsFromSearchParams(by, order)
      : setSortingOptionsToSearchParams('createdAt', 'desc');

    !min && !max && setPricesToSearchParams('', '');
  };

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
    setSearchParams(
      existingSearchParams => {
        console.log('existingSearchParams :>> ', existingSearchParams);
        existingSearchParams.set('key', '');
        return existingSearchParams;
      },
      { replace: true }
    );
  };

  const handleSliderSubmit = (minPrice, maxPrice) => {
    setSelectedPrices({ minPrice, maxPrice });
  };

  const handlePrices = (min, max) => {
    setSearchParams(
      existingSearchParams => {
        existingSearchParams.set('min', min);
        existingSearchParams.set('max', max);
        return existingSearchParams;
      },
      { replace: true }
    );
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
          // refresh={refreshCategory}
          onClick={toggleCloseCategorySelector}
          onOptionClick={clearSearchBar}
          forceClosing={sortingSelectorIsOpen}
        />
        <Selector
          name="sorting"
          label=""
          data={sortingTemplate}
          fetchSelectorValue={handleSortingOptions}
          // defaultValue={selectedSortingOption}
          defaultValue={sortingToShow}
          onClick={toggleCloseSortingSelector}
          forceClosing={categorySelectorIsOpen}
        />
      </div>

      <DoubleRangeSlider
        onSubmit={handlePrices}
        minLimit={products?.minPrice}
        maxLimit={products?.maxPrice}
        min={Number(priceMin)}
        max={Number(priceMax)}
        keyword={keyWord}
      />

      {products?.products && (
        <>
          <ProductList
            products={products.products}
            totalPages={products.totalPages}
            searchValue={keyWord}
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
