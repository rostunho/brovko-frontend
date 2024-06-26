import { useState, useEffect } from 'react';
import Selector from 'shared/components/Selector';
import { sortingOptions } from './constants';
import styles from './Filter.module.scss';

export default function Filter({
  categories,
  searchTerm,
  defaultCategory,
  defaultOption,
  onCategorySelect,
  onSortingSelect,
}) {
  const [currentCategories, setCurrentCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    () => defaultCategory
  );
  const [selectedSortingOption, setSelectedSortingOption] = useState({
    name: 'Сортування',
  });

  useEffect(() => {
    setCurrentCategories([...categories]);
  }, [categories]);

  useEffect(() => {
    if (selectedCategory.id === defaultCategory.id) {
      return;
    }

    onCategorySelect && onCategorySelect(selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    onSortingSelect(selectedSortingOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSortingOption]);

  const handleCategorySelect = category => {
    setSelectedCategory({ ...category });
  };

  const handleSortingSelect = option => {
    setSelectedSortingOption(option.name);
  };

  const customStyle = {
    color: 'black',
  };

  const customDropdownContainer = {
    width: '100%',
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Selector
          label=""
          style={customStyle}
          dropdownStyle={customDropdownContainer}
          name="category"
          data={currentCategories}
          defaultValue={{ name: 'Усі категорії' }}
          defaultOption={'Усі категорії'}
          fetchSelectorValue={handleCategorySelect}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Selector
          label=""
          style={customStyle}
          dropdownStyle={customDropdownContainer}
          name="option"
          data={sortingOptions}
          defaultValue={{ ...selectedSortingOption }}
          fetchSelectorValue={handleSortingSelect}
        />
      </div>
    </div>
  );
}
