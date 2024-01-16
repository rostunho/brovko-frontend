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

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
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
    order: 'desc',
    field: 'createdAt',
  });
  const [categorySelectorIsOpen, setCategorySelectorIsOpen] = useState(false);
  const [sortingSelectorIsOpen, setSortingSelectorIsOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  // беремо з бази даних актуальні категорії товарів
  useEffect(() => {
    (async () => {
      const savedCategories = await fetchAllCategories();
      //..
      searchParamsProcessing(savedCategories);
      //..
      setFirstRender(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // обнуляємо ключове слово при зміні категорії
  useEffect(() => {
    if (firstRender) {
      return;
    }
    setSearchParams({ category: selectedCategory.id });
    setSearchBarValue('');
    setKeyWord('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // кожного разу скидаємо тумблер refreshCategory в значення за замовчуванням
  useEffect(() => {
    if (!refreshCategory) {
      return;
    }
    setRefreshCategory(false);
  }, [refreshCategory]);

  const handleKeyWord = async () => {
    setKeyWord(searchBarValue);
    setSelectedCategory({
      name: 'Всі категорії старт',
      id: '',
    });
    // setSearchBarValue('');
    setRefreshCategory(true);
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
  const setCategoryToSearchParams = () => {
    setSearchParams({ category: selectedCategory.id });
  };

  const getCategoryFromSearchParams = savedCategories => {
    const savedCategoryId = searchParams.get('category');

    if (savedCategories.length < 1) {
      console.log('Ще немає списку усіх категорій');
      return;
    }

    const savedCategory = savedCategories.find(
      category => category.id === savedCategoryId
    ) || { id: '', name: 'Всі категорії відновлені' };

    setSelectedCategory({ ...savedCategory });
  };

  const searchParamsProcessing = savedCategories => {
    const category = searchParams.has('category');

    category
      ? getCategoryFromSearchParams(savedCategories)
      : setCategoryToSearchParams();
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
          fetchSelectorValue={setSelectedCategory}
          defaultValue={selectedCategory}
          defaultOption={'Всі категорії'}
          refresh={refreshCategory}
          onClick={toggleCloseCategorySelector}
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
      <ProductList
        keyWord={keyWord}
        category={selectedCategory}
        sorting={selectedSortingOption}
      />
    </>
  );
}
