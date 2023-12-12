// NEED TO REFACTOR FOR CLEANING

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import { initialSelectorValue } from './initialSelectorValue';
import styles from './Selector.module.scss';

export default function Selector({
  label = 'Категорія :',
  name,
  value,
  data,
  hotOptionsData,
  defaultValue,
  placeholder,
  form,
  size,
  fetchSelectorValue, // "витягує" поточне значення селектора в батьківський компонент
  openedDropdown,
  enteringField,
  onSaveClick,
  onChange,
  multiple,
  required,
  disabled,
  defaultOption,
  style,
  dropdownStyle,
  ...props
}) {
  // console.log('style', dropdownStyle);

  const [currentValue, setCurrentValue] = useState(
    defaultValue ? defaultValue : initialSelectorValue
  );
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const hotOptions = hotOptionsData || [];

  const id = nanoid(6);
  let key = 0;

  useEffect(() => {
    if (!defaultOption) {
      setCategories([...data]);
      return;
    }
    setCategories([{ name: defaultOption, id: '' }, ...data]);
  }, [defaultOption, data]);

  useEffect(() => {
    if (!defaultValue || currentValue) {
      return;
    }

    setCurrentValue({ ...defaultValue });
  }, [currentValue, defaultValue]);

  useEffect(() => {
    !currentValue &&
      fetchSelectorValue &&
      fetchSelectorValue({ ...currentValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);

  useEffect(() => {
    if (!defaultValue || !defaultValue.name) {
      return;
    }
    setCurrentValue({ ...defaultValue });
  }, [defaultValue]);

  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  const onOptionPress = category => {
    setCurrentValue(prevValue => ({ ...prevValue, ...category }));
    toggleDropdown();
  };

  const onHotOptionPress = option => {
    setCurrentValue(prevValue => ({ ...prevValue, name: option }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <label htmlFor={id}>{label}</label>
        <input
          // className={styles.select}
          className={`${styles.select} ${style ? styles['custom-style'] : ''}`}
          id={id}
          name={name}
          value={value || currentValue?.name}
          readOnly
          onClick={toggleDropdown}
          placeholder={placeholder}
          onChange={onChange}
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
      </div>
      {dropdownIsOpen && (
        <fieldset
          className={`${styles['dropdown-container']} ${
            dropdownStyle ? styles['custom-dropdown-container'] : ''
          }`}
        >
          {categories.map(category => {
            const isCheched = currentValue.name === category.name;
            return (
              <label
                key={key++}
                // key={categories.indexOf(category)}
                className={`${styles.label} ${styles['label-options']} ${
                  enteringField && styles['label-options--disabled']
                } ${isCheched && styles['is-checked']}`}
              >
                {category.name}
                <input
                  disabled={enteringField ? true : false}
                  type="radio"
                  name={name || 'option'}
                  value={category.name}
                  className={styles.option}
                  defaultChecked={currentValue.name === category.name}
                  onClick={() => onOptionPress(category)}
                  onChange={onChange}
                />
              </label>
            );
          })}
        </fieldset>
      )}

      {hotOptions.length > 0 && (
        <ul className={styles['hot-option-list']}>
          {hotOptions.map(option => {
            return (
              <li
                key={hotOptions.indexOf(option)}
                onClick={() => onHotOptionPress(option)}
              >
                <p className={styles['hot-option-text']}>{option}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

Selector.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired, // Ключами об'єкта можуть бути тільки "name"
      id: PropTypes.string, // і тільки "id". Жодних інших.
    })
  ),
  defaultValue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
  }),
  hotOptionsData: PropTypes.arrayOf(PropTypes.string),
};
