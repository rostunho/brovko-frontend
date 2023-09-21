import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { validateInputValue } from 'utils';
import { errorMessages } from './errorMessages';
import InputElement from './InputElement';
import Text from '../Text/Text';
import WarningIcon from 'shared/icons/WarningIcon';
import styles from './NewInput.module.scss';

export default function NewInput({
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
  const valueRef = useRef('');
  const rootValueHandling = { valueRef, updateRootValue };

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

  const handleOnChange = event => {
    onChange && onChange(event);
    validateInput(event);
  };

  const handleOnFocus = event => {
    onFocus && onFocus(event);
    setValidationChecking('pending');
    setErrorMessage('');
  };

  const handleOnBlur = event => {
    onBlur && onBlur(event);
    validateInput(event);
  };

  const validateInput = event => {
    const { value } = event.target;
    const { type } = event.target.dataset;

    if (type === 'text' || type === 'password' || type === 'date') {
      // забрати звідси type==='date'
      setValidationChecking('pending');
      return;
    }

    const result = validateInputValue(value, type);
    handleValidationResult(result, event);
  };

  const handleValidationResult = (result, event) => {
    const { type } = event.target.dataset;
    const { value } = event.target;
    const { type: eventType } = event;
    if (result) {
      setValidationChecking('isValid');
      setErrorMessage('');
    } else {
      if (eventType === 'blur' && value) {
        setValidationChecking('notValid');
        setErrorMessage(errorMessages[type]);
      } else if (eventType === 'change' && type === 'number') {
        setValidationChecking('notValid');
        setErrorMessage(errorMessages[type]);
      } else {
        setValidationChecking('pending');
      }
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
        } ${labelClassName ? labelClassName : ''}`}
      >
        {label}
        <InputElement
          type={type}
          className={`${styles.input} ${
            type === 'number' ? '' : styles[`${additionalClass}`]
          } ${inputClassName ? inputClassName : ''}`}
          name={name}
          placeholder={placeholder}
          value={rootValue}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          length={length}
          metrical={metrical}
          rootValueHandling={rootValueHandling} // об'єкт з інструментами для оновлення головного стейту
          {...props}
        />
        {error.message && (
          <>
            <WarningIcon className={styles['warning-icon']} />
            <Text type="error">{error.message}</Text>
          </>
        )}
      </label>
    </>
  );
}

NewInput.propTypes = {
  label: PropTypes.string,
  length: PropTypes.oneOf(['lg', 'md', 'sm']),
  type: PropTypes.oneOf([
    'text',
    'number',
    'password',
    'email',
    'tel',
    'url',
    'date',
    'checkbox',
    'radio',
  ]),
};
