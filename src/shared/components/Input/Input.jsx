import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { validateInputValue } from 'utils';
import { errorMessages } from './errorMessages';
import InputElement from './InputElement';
import Text from '../Text/Text';
import WarningIcon from 'shared/icons/WarningIcon';
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
  currency,
  pattern,
  validateStatus,
  ...props
}) {
  const [validationChecking, setValidationChecking] = useState('pending');
  const [additionalClass, setAdditionalClass] = useState('');
  const [error, setError] = useState({ message: '' });
  const [checkBoxIsChecked, setCheckBoxIsChecked] = useState(false);
  const isCheckbox = type === 'checkbox';
  const isRadio = type === 'radio';
  const id = nanoid(6);

  // console.log('INPUT RERENDERING');

  useEffect(handleValidation, [validateStatus, validationChecking]);

  function handleValidation() {
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

    validateStatus && validateStatus(validationChecking);
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
      event.target.dataset.type === 'date'
    ) {
      return;
    }

    // не валідуємо, якщо інпут порожній
    if (!event.target.value && event.target.dataset.type !== 'checkbox') {
      return;
    }

    // виходимо, якщо в телефоні інтуп залишається в стані за замовчуванням
    if (event.target.dataset.type === 'tel' && event.target.value.length <= 6) {
      return;
    }

    if (event.target.value.length <= 8) {
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
    // console.log('event.target.value :>> ', event.target.value);
    // console.log('event.target.dataset.type :>> ', event.target.dataset.type);
    // console.log('event.target.checked :>> ', event.target.checked);
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
    if (!event.target.value) {
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

  const additionalClassCondition =
    type === 'number' || type === 'radio' || type === 'checkbox';

  return (
    <>
      <div
        className={`${styles['input-box']} ${
          styles[`input-box__length--${length}`]
        } ${isCheckbox || isRadio ? styles['input-box__controls'] : ''} ${
          checkBoxIsChecked ? styles['input-box__controls--checked'] : ''
        } ${labelClassName ? labelClassName : ''}`}
      >
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <InputElement
          type={type}
          id={id}
          value={value} // перевірити, чи не вплине на інші інпути
          className={`${styles.input} ${
            additionalClassCondition ? '' : styles[`${additionalClass}`]
          } ${inputClassName ? inputClassName : ''}`}
          name={name}
          placeholder={placeholder}
          onClick={handleOnClick}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          length={length}
          metrical={metrical}
          currency={currency}
          // error={error}
          {...props}
        />
        {error.message && <WarningIcon className={styles['warning-icon']} />}
        {error.message && (
          <Text type="error" className={styles['input-error']}>
            {error.message}
          </Text>
        )}
      </div>
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
