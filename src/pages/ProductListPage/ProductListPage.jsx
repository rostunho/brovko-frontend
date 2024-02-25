import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllCategories, getAllProducts } from 'shared/services/api';
import { sortingTemplate } from './sortingTemplate';
import Heading from 'shared/components/Heading/Heading';
import Input from 'shared/components/Input';
import Selector from 'shared/components/Selector';
import ProductList from 'components/Products/ProductsList/ProductsList';
import Modal from 'shared/components/Modal/Modal';
import styles from './ProductListPage.module.scss';
import DoubleRangeSlider from 'shared/components/Input/InputRange/DoubleRangeSlider';
import Pagination from 'components/Products/Pagination';
import ProductCardSkeleton from 'components/Products/Skeleton/ProductCardSkeleton';

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyWord = searchParams.get('key');
  const categoryId = searchParams.get('id');
  const categoryName = searchParams.get('name'); // потрібна лише для дефолтного виявлення категорії при вставленні урли в нове вікно без повторних рендерів
  const sortingBy = searchParams.get('by');
  const sortingOrder = searchParams.get('order');
  const priceMin = searchParams.get('min');
  const priceMax = searchParams.get('max');
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const [products, setProducts] = useState([]);
  const [searchBarValue, setSearchBarValue] = useState('');
  const [sortingToShow, setSortingToShow] = useState({
    id: 0,
    name: 'Сортування',
  });

  const [currentCategories, setCurrentCategories] = useState([]);

  const [categorySelectorIsOpen, setCategorySelectorIsOpen] = useState(false);
  const [sortingSelectorIsOpen, setSortingSelectorIsOpen] = useState(false);

  // const [page, setPage] = useState(1);
  const [firstRender, setFirstRender] = useState(true);
  const [loadingData, setLoadingData] = useState(true); // Додаємо стан для відстеження завантаження даних
  const [loadingPage, setLoadingPage] = useState(false);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    if (!firstRender) {
      return;
    }

    (async () => {
      await fetchCategories();
      await fetchProducts(Number(page), Number(limit)); // при першому рендері page=null i limit=null, тому функція викличеться без них. Зате при прямому вставленні урли - спрацюють;
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

  useEffect(() => {
    if (firstRender || page === '0') {
      // (page === '0') - тільки під час ініціації
      return;
    }

    fetchProducts(page, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

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

  const fetchProducts = async (page, limit) => {
    setLoadingPage(true);
    await new Promise(resolve => setTimeout(resolve, 250));
    (async () => {
      try {
        const response = await getAllProducts({
          search: keyWord,
          categoryId: categoryId,
          sortBy: sortingBy,
          sortOrder: sortingOrder,
          priceMin: priceMin,
          priceMax: priceMax,
          page: page ? Number(page) : 1,
          perPage: limit ? Number(limit) : 12,
        });
        setProducts(response);

        setLoadingData(false);
        setLoadingPage(false);
        setError(null);
        setShowErrorModal(false);
      } catch (error) {
        console.log('Не отримано продуктів', error);
        setError(
          'Помилка при завантаженні даних з сервера. Будь ласка, спробуйте ще раз пізніше.'
        );
        setShowErrorModal(true);
      }
    })();
  };

  const getKeyWordFromSearchParams = keyWord => {
    setSearchBarValue(keyWord);
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

  const setPagesToSearchParams = (page, limit) => {
    setSearchParams(
      existingSearchParams => {
        existingSearchParams.set('page', page);
        existingSearchParams.set('limit', limit);
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
      : setSortingOptionsToSearchParams('createdAt', 'asc');

    !min && !max && setPricesToSearchParams('', '');

    !page && !limit && setPagesToSearchParams(0, 12); // По нулю будемо ідентифыкувати значення ініціації
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

  const setPageNumber = number => {
    setSearchParams(
      existingSearchParams => {
        existingSearchParams.set('page', number);
        return existingSearchParams;
      },
      { replace: true }
    );
  };

  const handleChangePage = pageNumber => {
    setPageNumber(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const closeModal = () => {
    setShowErrorModal(false);
  };

  const errorModalContent = (
    <Modal className={styles['modal-container']} closeModal={closeModal}>
      <div className={styles.modal}>
        <h2>Йой, сервер не відповідає...</h2>
        <p className={styles.modalText}>
          Помилка при завантаженні даних з сервера. Будь ласка, спробуйте ще раз
          пізніше.
        </p>
      </div>
    </Modal>
  );

  return (
    <>
      {loadingData || loadingPage ? (
        <ProductCardSkeleton />
      ) : (
        <>
          {showErrorModal && errorModalContent}
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
              fetchSelectorValue={handleCategory}
              defaultValue={{
                id: categoryId,
                name: categoryName,
              }}
              defaultOption={'Всі категорії'}
              onClick={toggleCloseCategorySelector}
              onOptionClick={clearSearchBar}
              forceClosing={sortingSelectorIsOpen}
            />
            <Selector
              name="sorting"
              label=""
              data={sortingTemplate}
              fetchSelectorValue={handleSortingOptions}
              defaultValue={sortingToShow}
              onClick={toggleCloseSortingSelector}
              forceClosing={categorySelectorIsOpen}
            />
          </div>

          {products.products.length > 1 && (
            <DoubleRangeSlider
              onSubmit={handlePrices}
              minLimit={products?.minPrice}
              maxLimit={products?.maxPrice}
              min={Number(priceMin)}
              max={Number(priceMax)}
              keyword={keyWord}
            />
          )}

          {products?.products && (
            <>
              <ProductList
                products={products.products}
                totalPages={products.totalPages}
                searchValue={keyWord}
              />
              <Pagination
                page={page === '0' ? 1 : Number(page)}
                totalPages={products.totalPages}
                onChangePage={handleChangePage}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
