import { useEffect, useState } from 'react';
import { getAllCategories } from 'shared/services/api';
import { sortingTemplate } from './sortingTemplate';
import Loader from 'components/Loader';
import Heading from 'shared/components/Heading/Heading';
import Input from 'shared/components/Input';
import Selector from 'shared/components/Selector';
import ProductList from 'components/Products/ProductsList/ProductsList';

export default function ProductListPage() {
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
  const [firstRender, setFirstRender] = useState(true);

  // беремо з бази даних актуальні категорії товарів
  useEffect(() => {
    fetchAllCategories();
    setFirstRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // обнуляємо ключове слово при зміні категорії
  useEffect(() => {
    if (firstRender) {
      return;
    }

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
        keyWord={keyWord}
        category={selectedCategory}
        sorting={selectedSortingOption}
      />
    </>
  );
}
