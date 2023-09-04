import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import SaveIcon from 'shared/icons/SaveIcon';
import styles from './Select.module.scss';

export default function Select({
  data,
  name,
  defaultValue,
  form,
  size,
  fetchSelectorValue, // "витягує" поточне значення селектора в батьківський компонент
  openedDropdown,
  enteringField,
  onSaveClick,
  multiple,
  required,
  disabled,
  defaultOption = 'Без категорії',
  ...props
}) {
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const [categories, setCategories] = useState([]);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  // const [enteringField, setEnteringField] = useState(false);

  let id = 0;

  useEffect(() => {
    if (!defaultOption) {
      return;
    }
    setCategories([{ name: defaultOption, id: '' }, ...data]);
  }, [defaultOption, data]);

  useEffect(() => {
    setDropdownIsOpen(openedDropdown);
  }, [openedDropdown]);

  useEffect(() => {
    fetchSelectorValue(currentValue);
  }, [currentValue, fetchSelectorValue]);

  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  const onOptionPress = category => {
    setCurrentValue(category);
    toggleDropdown();
    fetchSelectorValue(currentValue);
    // props.onOptionPress(category);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        Категорія
        <input
          className={styles.select}
          value={currentValue}
          readOnly
          onClick={toggleDropdown}
        />
        <button
          type="button"
          className={`${styles.button} ${
            dropdownIsOpen && styles['icon-reverse']
          } `}
          onClick={toggleDropdown}
        >
          <DropdownArrowIcon className={`${styles.icon} `} />
        </button>
      </label>
      {dropdownIsOpen && (
        <fieldset className={styles['dropdown-container']}>
          {enteringField && (
            <label className={`${styles.label} ${styles['label-options']}`}>
              <input
                className={`${styles.option} ${styles['add-category']}`}
                placeholder="Введіть назву категорії"
                autoFocus
              />
              <button
                type="button"
                className={`${styles.button} ${styles['button--save']}`}
                onClick={onSaveClick}
              >
                <SaveIcon className={`${styles.icon} ${styles['icon-save']}`} />
              </button>
            </label>
          )}
          {categories.map(category => {
            const isCheched = currentValue === category.name;
            return (
              <label
                key={id++}
                className={`${styles.label} ${styles['label-options']} ${
                  enteringField && styles['label-options--disabled']
                } ${isCheched && styles['is-checked']}`}
              >
                {category.name}
                <input
                  disabled={enteringField ? true : false}
                  type="radio"
                  name="option"
                  value={category.name}
                  className={styles.option}
                  defaultChecked={currentValue === category}
                  onClick={() => onOptionPress(category.name)}
                />
              </label>
            );
          })}
        </fieldset>
      )}
    </div>
  );
}

Select.propTypes = {
  data: PropTypes.array,
  //   data: PropTypes.array.isRequired,
};
