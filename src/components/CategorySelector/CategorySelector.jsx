import { useState } from 'react';
import Select from 'shared/components/Select/Select';
import Button from 'shared/components/Button/Button';
import styles from './CategorySelector.module.scss';

export default function CategorySelector({ categories, ...props }) {
  const [addCategorieFieldShown, setAddCategorieFieldShown] = useState(false);
  const [openedDropdown, setOpenedDropdown] = useState(false);

  const toggleAddCategorieField = () => {
    setAddCategorieFieldShown(!addCategorieFieldShown);
    setOpenedDropdown(!openedDropdown);
  };

  const saveNewCategory = () => {
    // logic of saving a new categorie here
  };

  return (
    <div className={styles.category}>
      <Select
        className={styles.select}
        label="Категорія"
        name="Category"
        data={categories}
        defaultValue="Без категорії"
        openedDropdown={openedDropdown}
        enteringField={addCategorieFieldShown}
        onSaveClick={saveNewCategory}
      />
      <Button mode="adding" onClick={toggleAddCategorieField}>
        Додати категорію
      </Button>
    </div>
  );
}
