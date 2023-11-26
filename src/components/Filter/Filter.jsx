import { useState } from 'react';
// import DropdownMenu from './DropdownMenu';
// import Button from 'shared/components/Button';
// import ArrowDownIcon from 'shared/icons/ArrowDownIcon';
import Selector from 'shared/components/Selector';
import { categories, sortingOptions } from './constants';
import styles from './Filter.module.scss';

export default function Filter({ onCategorySelect, onSortingSelect }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);

  const handleCategorySelect = category => {
    setSelectedCategory(
      category.name === 'Всі категорії' ? null : category.name
    ); // Збросити вибрану категорію
    onCategorySelect(category.name === 'Всі категорії' ? null : category.name); // Виклик функції батьківського компонента
    console.log(category.name);
  };

  const handleSortingSelect = option => {
    setSelectedSortingOption(option.name);
    onSortingSelect(option.name);
    // console.log('Option:', option);
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
          defaultValue={{ name: 'Всі категорії' }}
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
          defaultValue={{ name: 'Сортування' }}
          fetchSelectorValue={handleSortingSelect}
        />
      </div>
    </div>
  );
}
