import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import styles from './Select.module.scss';

export default function Select({
  data,
  name,
  form,
  size,
  multiple,
  required,
  disabled,
  defaultOption = 'Без категорії',
  ...props
}) {
  const [currentValue, setCurrentValue] = useState('Без категорії');
  const [categories, setCategories] = useState([]);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  let id = 0;

  useEffect(() => {
    if (!defaultOption) {
      return;
    }

    setCategories([defaultOption, ...data]);
  }, [defaultOption, data]);

  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  const onOptionPress = category => {
    setCurrentValue(category);
    toggleDropdown();
    props.onOptionPress(category);
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
        <DropdownArrowIcon
          className={`${styles.icon} ${
            dropdownIsOpen && styles['icon-reverse']
          }`}
        />
      </label>
      {dropdownIsOpen && (
        <fieldset className={styles['dropdown-container']}>
          {categories.map(category => {
            const isCheched = currentValue === category;
            return (
              <label
                key={id++}
                className={`${styles.label} ${styles['label-options']} ${
                  isCheched && styles['is-checked']
                }`}
              >
                {category}
                <input
                  type="radio"
                  name="option"
                  value={category}
                  className={styles.option}
                  defaultChecked={currentValue === category}
                  onClick={() => onOptionPress(category)}
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
