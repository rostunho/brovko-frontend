import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllCategories } from 'shared/services/api';
import { sortingTemplate } from './sortingTemplate';
// import Loader from 'components/Loader';
import Heading from 'shared/components/Heading/Heading';
import Input from 'shared/components/Input';
import Selector from 'shared/components/Selector';
import ProductList from 'components/Products/ProductsList/ProductsList';
import styles from './ProductListPage.module.scss';
import DoubleRangeSlider from 'shared/components/Input/InputRange/DoubleRangeSlider';

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchBarValue, setSearchBarValue] = useState('');
  const [keyWord, setKeyWord] = useState('');
  const [currentCategories, setCurrentCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    name: 'Всі категорії старт',
    id: 'all',
  });
  const [refreshCategory, setRefreshCategory] = useState(false);
  const [selectedSortingOption, setSelectedSortingOption] = useState({
    id: 0,
    name: 'Сортування',
    order: 'desc',
    field: 'createdAt',
  });
  const [categorySelectorIsOpen, setCategorySelectorIsOpen] = useState(false);
  const [sortingSelectorIsOpen, setSortingSelectorIsOpen] = useState(false);
  const [refreshProducts, setRefreshProducts] = useState(false);

  const [prices, setPrices] = useState(null);
  // const [firstRender, setFirstRender] = useState(true);

  // беремо з бази даних актуальні категорії товарів
  useEffect(() => {
    (async () => {
      const savedCategories = await fetchAllCategories();
      searchParamsProcessing(savedCategories);
      // setFirstRender(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // обнуляємо ключове слово при зміні категорії
  useEffect(() => {
    // if (firstRender) {
    //   return;
    // }
    // setSearchBarValue('');
    // setKeyWord('');
    setSearchParams({
      key: keyWord,
      category: selectedCategory.id,
      sort: selectedSortingOption.field,
      order: selectedSortingOption.order,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, keyWord, selectedSortingOption]);

  // кожного разу скидаємо тумблер refreshCategory в значення за замовчуванням
  useEffect(() => {
    if (!refreshCategory) {
      return;
    }
    setRefreshCategory(false);
  }, [refreshCategory]);

  useEffect(() => {
    if (!refreshProducts) {
      return;
    }
    setRefreshProducts(false);
  }, [refreshProducts]);

  const handleKeyWord = async () => {
    setKeyWord(searchBarValue);
    setSelectedCategory({
      name: 'Всі категорії старт',
      id: 'all',
    });
    // setSearchBarValue('');
    setRefreshCategory(true);
    searchBarValue === '' && setRefreshProducts(true);
  };

  const fetchAllCategories = async () => {
    const { categories } = await getAllCategories();
    setCurrentCategories([...categories]);
    return categories;
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
    setKeyWord('');
  };

  const setCategoryToSearchParams = () => {
    setSearchParams({
      key: keyWord,
      category: selectedCategory.id,
      sort: selectedSortingOption.field,
      order: selectedSortingOption.order,
    });
  };

  const getCategoryFromSearchParams = savedCategories => {
    const savedCategoryId = searchParams.get('category');

    if (savedCategories.length < 1) {
      console.log('Ще немає списку усіх категорій');
      return;
    }

    const savedCategory = savedCategories.find(
      category => category.id === savedCategoryId
    ) || { id: 'all', name: 'Всі категорії відновлені' };

    setSelectedCategory({ ...savedCategory });
  };

  const setKeyWordtoSearchParams = () => {
    setSearchParams({
      key: keyWord,
      category: selectedCategory.id,
      sort: selectedSortingOption.field,
      order: selectedSortingOption.order,
    });
  };

  const getKeyWordFromSearchParams = () => {
    const savedKeyWord = searchParams.get('key');
    setSearchBarValue(savedKeyWord);
    setKeyWord(savedKeyWord);
  };

  const setSortingToSearchParams = () => {
    setSearchParams({
      key: keyWord,
      category: selectedCategory.id,
      sort: selectedSortingOption.field,
      order: selectedSortingOption.order,
    });
  };

  const getSortingFromSearchParams = template => {
    const savedField = searchParams.get('sort');
    const savedOrder = searchParams.get('order');

    const { id, name } = template
      .filter(el => el.field === savedField)
      .find(el => el.order === savedOrder);

    setSelectedSortingOption({
      id: id,
      name: name,
      field: savedField,
      order: savedOrder,
    });
  };

  const searchParamsProcessing = savedCategories => {
    const category = searchParams.has('category');
    const keyWord = searchParams.get('key');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    category
      ? getCategoryFromSearchParams(savedCategories)
      : setCategoryToSearchParams();

    keyWord ? getKeyWordFromSearchParams() : setKeyWordtoSearchParams();

    if (sort && order) {
      getSortingFromSearchParams(sortingTemplate);
    } else {
      setSortingToSearchParams();
    }
  };

  const handleSliderSubmit = (minPrice, maxPrice) => {
    // Обробка значень minPrice та maxPrice
    console.log('minPrice:', minPrice);
    console.log('maxPrice:', maxPrice);

    // Додайте інші необхідні дії тут
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
          fetchSelectorValue={setSelectedCategory}
          defaultValue={selectedCategory}
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
        min={prices?.minPrice}
        max={prices?.maxPrice}
      />
      <ProductList
        searchValue={keyWord}
        category={selectedCategory}
        sorting={selectedSortingOption}
        refresh={refreshProducts}
        onProductsChange={setPrices}
      />
    </>
  );
}
