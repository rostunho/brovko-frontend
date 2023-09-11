import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import { initialSelectorValue } from './initialSelectorValue';
import styles from './Selector.module.scss';

export default function Selector({
  label = 'Категорія :',
  name,
  value,
  data,
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
  ...props
}) {
  const [currentValue, setCurrentValue] = useState(
    defaultValue || initialSelectorValue
  );
  const [categories, setCategories] = useState([]);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  let id = 0;

  useEffect(() => {
    if (!defaultOption) {
      setCategories([...data]);
      return;
    }
    setCategories([{ name: defaultOption, id: '' }, ...data]);
  }, [defaultOption, data]);

  useEffect(() => {
    setDropdownIsOpen(openedDropdown);
  }, [openedDropdown]);

  useEffect(() => {
    fetchSelectorValue && fetchSelectorValue({ ...currentValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);

  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  const onOptionPress = category => {
    setCurrentValue(prevValue => ({ ...prevValue, ...category }));
    toggleDropdown();
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
        <input
          className={styles.select}
          value={value || currentValue.name}
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
      </label>
      {dropdownIsOpen && (
        <fieldset className={styles['dropdown-container']}>
          {categories.map(category => {
            const isCheched = currentValue.name === category.name;
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
    </div>
  );
}

Selector.propTypes = {
  data: PropTypes.array,
  defaultValue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
  }),
};
