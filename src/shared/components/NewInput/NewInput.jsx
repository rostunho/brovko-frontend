import { useState, useEffect } from 'react';
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
  labelClassName,
  inputClassName,
  name,
  value,
  length = 'lg',
  onChange,
  onFocus,
  onBlur,
  ...props
}) {
  const [currentValue, setCurrentValue] = useState('');
  const [validationChecking, setValidationChecking] = useState('pending');
  const [additionalClass, setAdditionalClass] = useState('');
  const [error, setError] = useState({ message: '' });

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

  const handleOnChange = event => {
    onChange && onChange(event);
    setCurrentValue(event.target.value);
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
    const { value, type } = event.target;
    if (type === 'text') {
      setValidationChecking('pending');
      return;
    }

    const result = validateInputValue(value, type);
    handleValidationResult(result, event);
  };

  const handleValidationResult = (result, event) => {
    if (result) {
      setValidationChecking('isValid');
      setErrorMessage('');
    } else {
      if (event.type === 'blur') {
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
          className={`${styles.input} ${styles[`${additionalClass}`]} ${
            inputClassName ? inputClassName : ''
          }`}
          name={name}
          placeholder={placeholder}
          value={currentValue}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
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
