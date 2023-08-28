import { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import Button from 'shared/components/Button';
import styles from './Filter.module.scss';

export default function Filter({ onCategorySelect }) {
  const categories = ['Всі категорії', 'Палянички', 'Набори'];
  const sortingOptions = ['Option 1', 'Option 2', 'Option 3'];

  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showSortingMenu, setShowSortingMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    console.log(category);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button mode="outlinedGrey" onClick={handleCategoryClick}>
          Всі категорії
        </Button>
        {showCategoriesMenu && (
          <DropdownMenu items={categories} onSelect={handleCategorySelect} />
        )}
      </div>
      <div className={styles.buttonContainer}>
        <Button mode="outlinedGrey" onClick={handleSortingClick}>
          Сортування
        </Button>
        {showSortingMenu && (
          <DropdownMenu
            items={sortingOptions}
            onSelect={selectedItem => console.log(selectedItem)}
          />
        )}
      </div>
    </div>
  );
}
