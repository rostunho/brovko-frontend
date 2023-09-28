import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { validateInputValue } from 'utils';
import { errorMessages } from './errorMessages';
import InputElement from './InputElement';
import Text from '../Text/Text';
// import WarningIcon from 'shared/icons/WarningIcon';
import styles from './Input.module.scss';

export default function Input({
  type = 'text',
  label,
  placeholder,
  //   додатковий клас для підпису (якщо потрібен)
  labelClassName,
  //   додатковий клас для інпуту (якщо потрібен)
  inputClassName,
  name,
  value,
  //   довжина блоку з інпутом
  length = 'lg',
  onClick,
  onChange,
  onFocus,
  onBlur,
  //   метричні одиниці "кг", "км", тощо (якщо потрібні)
  metrical,
  pattern,
  ...props
}) {
  const [rootValue, setRootValue] = useState('');
  const [validationChecking, setValidationChecking] = useState('pending');
  const [additionalClass, setAdditionalClass] = useState('');
  const [error, setError] = useState({ message: '' });
  const [checkBoxIsChecked, setCheckBoxIsChecked] = useState(false);
  const valueRef = useRef('');
  const rootStateHandling = { valueRef, updateRootValue };
  const isCheckbox = type === 'checkbox';
  const isRadio = type === 'radio';

  useEffect(() => {
    value && setRootValue(value);
  }, [value]);

  useEffect(() => {
    switch (validationChecking) {
      case 'pending':
        setAdditionalClass('');
        break;
      case 'isValid':
        setAdditionalClass('input--is-valid');
        break;
      case 'notValid':
        setAdditionalClass('input--not-valid');
        break;
      default:
        setAdditionalClass('');
    }
  }, [validationChecking]);

  function updateRootValue() {
    setRootValue('');
    setRootValue(valueRef.current);
  }

  const handleOnClick = event => {
    onClick && onClick(event);
  };

  const handleOnChange = event => {
    onChange && onChange(event);

    isCheckbox && setCheckBoxIsChecked(!checkBoxIsChecked);

    // КОТЕЛ ВАЛІДАЦІЇ
    if (
      event.target.dataset.type === 'text' ||
      event.target.dataset.type === 'search' ||
      event.target.dataset.type === 'search' ||
      event.target.dataset.type === 'date' ||
      event.target.dataset.type === 'radio'
    ) {
      return;
    }

    // не валідуємо, якщо інпут порожній
    if (!rootValue) {
      return;
    }

    // виходимо, якщо в телефоні інтуп залишається в стані за замовчуванням
    if (event.target.dataset.type === 'tel' && event.target.value.length <= 6) {
      return;
    }

    if (rootValue.length <= 8) {
      setValidationChecking('pending');
    }

    const validationResult = validateInputValue(
      event.target.value,
      event.target.dataset.type
    );

    if (validationResult) {
      setErrorMessage('');
      setValidationChecking('isValid');
    }
  };

  const handleOnFocus = event => {
    onFocus && onFocus(event);

    setValidationChecking('pending');
    setErrorMessage('');
  };

  const handleOnBlur = event => {
    onBlur && onBlur(event);

    // КОТЕЛ ВАЛІДАЦІЇ
    if (
      event.target.dataset.type === 'text' ||
      event.target.dataset.type === 'search' ||
      event.target.dataset.type === 'date'
    ) {
      return;
    }

    // не валідуємо, якщо інпут порожній
    if (!rootValue) {
      return;
    }

    // виходимо, якщо в телефоні інтуп залишається в стані за замовчуванням
    if (event.target.dataset.type === 'tel' && event.target.value.length <= 6) {
      return;
    }

    const validationResult = validateInputValue(
      event.target.value,
      event.target.dataset.type
    );

    if (validationResult) {
      setErrorMessage('');
      setValidationChecking('isValid');
    } else {
      setValidationChecking('notValid');
      setErrorMessage(errorMessages[event.target.dataset.type]);
    }
  };

  const setErrorMessage = value => {
    setError(prevError => ({ ...prevError, message: value }));
  };

  return (
    <>
      <label
        className={`${styles['input-box']} ${
          styles[`input-box__length--${length}`]
        } ${isCheckbox || isRadio ? styles['input-box__controls'] : ''} ${
          checkBoxIsChecked ? styles['input-box__controls--checked'] : ''
        } ${labelClassName ? labelClassName : ''}`}
      >
        {label}
        <InputElement
          type={type}
          value={rootValue}
          className={`${styles.input} ${
            type === 'number' ? '' : styles[`${additionalClass}`]
          } ${inputClassName ? inputClassName : ''}`}
          name={name}
          placeholder={placeholder}
          onClick={handleOnClick}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          length={length}
          metrical={metrical}
          error={error}
          rootStateHandling={rootStateHandling} // об'єкт з інструментами для оновлення головного стейту
          {...props}
        />
        {/* <WarningIcon className={styles['warning-icon']} /> */}
        <Text type="error" className={styles['input-error']}>
          {error.message}
        </Text>
      </label>
      {error.message && <></>}
    </>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  length: PropTypes.oneOf(['lg', 'md', 'sm']),
  type: PropTypes.oneOf([
    'text',
    'number',
    'password',
    'email',
    'tel',
    'search',
    'url',
    'date',
    'checkbox',
    'radio',
  ]),
};
