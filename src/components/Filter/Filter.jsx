import { useState, useEffect } from 'react';
// import DropdownMenu from './DropdownMenu';
// import Button from 'shared/components/Button';
// import ArrowDownIcon from 'shared/icons/ArrowDownIcon';
import Selector from 'shared/components/Selector';
import { sortingOptions } from './constants';
import styles from './Filter.module.scss';

export default function Filter({
  categories,
  searchTerm,
  onCategorySelect,
  onSortingSelect,
}) {
  const [selectedCategory, setSelectedCategory] = useState({
    name: 'Всі категорії',
  });
  const [selectedSortingOption, setSelectedSortingOption] = useState({
    name: 'Сортування',
  });

  console.log('INNER selectedCategory >> :', selectedCategory);

  useEffect(() => {
    onCategorySelect(selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // useEffect(() => {
  //   // setSelectedCategory({
  //   //   name: 'Всі категорії',
  //   // });
  //   setSelectedCategory(null);
  // }, [searchTerm]);

  useEffect(() => {
    onSortingSelect(selectedSortingOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSortingOption]);

  const handleCategorySelect = category => {
    setSelectedCategory(
      category.name === 'Всі категорії'
        ? { name: 'Всі категорії' }
        : category.id
    );
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
          data={categories}
          searchTerm={searchTerm}
          defaultValue={{ ...selectedCategory }}
          valueChange={selectedCategory}
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
