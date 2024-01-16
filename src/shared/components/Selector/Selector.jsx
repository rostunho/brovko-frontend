// NEED TO REFACTOR FOR CLEANING

import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import { initialSelectorValue } from './initialSelectorValue';
import styles from './Selector.module.scss';

export default function Selector({
  label = 'Категорія :',
  name,
  value,
  data,
  hotOptionsData,
  defaultValue, // ключ name буде значенням селектора за замовчуванням
  placeholder,
  size,
  onClick,
  fetchSelectorValue, // "витягує" поточне значення селектора в батьківський компонент
  forceClosing, // допомагає "примусово" програмно закрити дропдаун з батьківскього компонента
  openedDropdown,
  enteringField,
  onSaveClick,
  onChange,
  multiple,
  required,
  disabled,
  defaultOption, // опція, яка буде першою у списку-випадайці
  refresh, // допомагає сикнути значення селектора до "за замовчуванням"
  style,
  dropdownStyle,

  ...props
}) {
  const [currentValue, setCurrentValue] = useState(
    // defaultValue ? defaultValue : initialSelectorValue
    initialSelectorValue
  );
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const hotOptions = hotOptionsData || [];

  const id = nanoid(6);
  let key = 0;

  console.log('(defaultValue) :>> ', defaultValue);

  useEffect(() => {
    if (firstRender) {
      defaultValue && setCurrentValue(defaultValue);
    }

    setFirstRender(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentValue({ ...defaultValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue.id]);

  // useEffect(() => {
  //   if (!defaultValue || currentValue) {
  //     return;
  //   }

  //   setCurrentValue({ ...defaultValue });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (!defaultOption) {
      setCategories([...data]);
      return;
    }
    setCategories([{ name: defaultOption, id: '' }, ...data]);
  }, [defaultOption, data]);

  useEffect(() => {
    if (firstRender) {
      return;
    }

    defaultValue?.name !== currentValue?.name &&
      fetchSelectorValue &&
      fetchSelectorValue({ ...currentValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);

  useEffect(() => {
    if (firstRender) {
      return;
    }
    setCurrentValue(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    if (!forceClosing) {
      return;
    }

    setDropdownIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceClosing]);

  const toggleDropdown = () => {
    onClick && onClick();
    setDropdownIsOpen(!dropdownIsOpen);
  };

  const onOptionPress = category => {
    setCurrentValue(prevValue => ({ ...prevValue, ...category }));
    // fetchSelectorValue && fetchSelectorValue({ ...currentValue });
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
          value={currentValue?.name}
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
            label === '' ? styles['without-label'] : ''
          } ${dropdownStyle ? styles['custom-dropdown-container'] : ''}`}
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

// Selector.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.exact({
//       name: PropTypes.string, // Ключами об'єкта можуть бути тільки "name"
//       id: PropTypes.string, //  тільки "id".
//       parentId: PropTypes.string, //  тільки "parentId". Жодних інших.
//     })
//   ),
//   defaultValue: PropTypes.shape({
//     name: PropTypes.string,
//     id: PropTypes.string,
//   }),
//   hotOptionsData: PropTypes.arrayOf(PropTypes.string),
// };
