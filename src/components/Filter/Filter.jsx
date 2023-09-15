import { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import Button from 'shared/components/Button';
// import ArrowDownIcon from 'shared/icons/ArrowDownIcon';
// import Selector from 'shared/components/Selector';
import { categories, sortingOptions } from './constants';
import styles from './Filter.module.scss';

export default function Filter({ onCategorySelect, onSortingSelect }) {
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showSortingMenu, setShowSortingMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);

  const handleCategoryClick = () => {
    setShowCategoriesMenu(!showCategoriesMenu);
    setShowSortingMenu(false);
    setSelectedCategory(null); // Збросити вибрану категорію
  };

  const handleSortingClick = () => {
    setShowSortingMenu(!showSortingMenu);
    setShowCategoriesMenu(false);
  };

  const handleCategorySelect = category => {
    setShowCategoriesMenu(false);
    setSelectedCategory(category === 'Всі категорії' ? null : category); // Збросити вибрану категорію
    onCategorySelect(category === 'Всі категорії' ? null : category); // Виклик функції батьківського компонента
    // console.log(category);
  };

  const handleSortingSelect = option => {
    setShowSortingMenu(false);
    setSelectedSortingOption(option);
    onSortingSelect(option);
    // console.log('Option:', option);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button
          size="sm"
          mode="sort"
          onClick={handleCategoryClick}
          style={{ fontWeight: 400 }}
        >
          Всі категорії
        </Button>
        {showCategoriesMenu && (
          <DropdownMenu items={categories} onSelect={handleCategorySelect} />
        )}
      </div>
      <div className={styles.buttonContainer}>
        {/* <Selector
          size="sm"
          data={sortingOptions}
          onOptionPress={handleSortingSelect}
        /> */}
        <Button
          size="sm"
          mode="sort"
          onClick={handleSortingClick}
          style={{ fontWeight: 400 }}
        >
          Сортування
        </Button>
        {showSortingMenu && (
          <DropdownMenu items={sortingOptions} onSelect={handleSortingSelect} />
        )}
      </div>
    </div>
  );
}
