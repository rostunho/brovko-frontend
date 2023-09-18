import { useState, useEffect } from 'react';
import { validateValue, emailRegex } from 'shared/utils';
import WarningIcon from 'shared/icons/WarningIcon';
import styles from './TextInput.module.scss';

export default function TextInput({
  type,
  className,
  name,
  placeholder,
  value,
  onChange,
  LabelComponent,
  ...props
}) {
  const [validationChecking, setValidationChecking] = useState('pending');
  const [additionalClass, setAdditionalClass] = useState('');
  const [validationErrorMessage, setValidationErrorMessage] = useState('');

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
    onChange && onChange();
    validateInput(event);
  };

  const handleOnFocus = event => {
    props.onFocus && props.onFocus();
    setValidationChecking('pending');
    setValidationErrorMessage('');
  };

  const handleOnBlur = event => {
    props.onBlur && props.onBlur();
    validateInput(event);
  };

  const validateInput = event => {
    if (type === 'text') {
      setValidationChecking('pending');
      return;
    }

    const { value } = event.target;
    const result = validateValue(value, emailRegex);

    if (result) {
      setValidationChecking('isValid');
      setValidationErrorMessage('');
    } else {
      if (event.type === 'blur') {
        setValidationChecking('notValid');
        setValidationErrorMessage('Введіть валідну адресу електронної пошти');
      } else {
        setValidationChecking('pending');
      }
    }
  };

  return (
    <LabelComponent>
      <input
        type={type}
        className={`${className ? className : ''} ${
          styles[`${additionalClass}`]
        }`}
        name={name}
        placeholder={placeholder}
        value={value}
        inputMode={type === 'email' ? 'email' : 'text'}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
      />
      {validationErrorMessage && (
        <WarningIcon className={styles['warning-icon']} />
      )}
    </LabelComponent>
  );
}
