import { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import Button from 'shared/components/Button';
import styles from './Filter.module.scss';

export default function Filter() {
  const categories = ['Category 1', 'Category 2', 'Category 3'];
  const sortingOptions = ['Option 1', 'Option 2', 'Option 3'];

  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showSortingMenu, setShowSortingMenu] = useState(false);

  const handleCategoryClick = () => {
    setShowCategoriesMenu(!showCategoriesMenu);
    setShowSortingMenu(false);
  };

  const handleSortingClick = () => {
    setShowSortingMenu(!showSortingMenu);
    setShowCategoriesMenu(false);
  };

  return (
    <div className={styles.container}>
      <Button mode="outlined" onClick={handleCategoryClick}>
        Всі категорії
      </Button>
      {showCategoriesMenu && (
        <DropdownMenu
          items={categories}
          onSelect={selectedItem => console.log(selectedItem)}
        />
      )}

      <Button mode="outlined" onClick={handleSortingClick}>
        Сортування
      </Button>
      {showSortingMenu && (
        <DropdownMenu
          items={sortingOptions}
          onSelect={selectedItem => console.log(selectedItem)}
        />
      )}
    </div>
  );
}
