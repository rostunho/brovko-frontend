import { useState, useEffect } from 'react';
import { toPhoneFormat, parsePhoneNumber } from 'utils';
import styles from './NumericInput.module.scss';

export default function NumericInput({ rootValueHandling, ...props }) {
  const { type, metrical, length, className, onChange } = props;
  const { valueRef, updateRootValue } = rootValueHandling;

  const phonePrefix = '+380';
  const [inputValue, setInputValue] = useState(phonePrefix);
  const [phoneFormatValue, setPhoneFormatValue] = useState('');

  const [numberValue, setNumberValue] = useState('');
  const [metricClassName, setMetricClassName] = useState('');
  const showMetricalParams = metrical && length !== 'lg';

  // type="tel" handling
  useEffect(() => {
    if (type !== 'tel') {
      return;
    }

    updatePhoneNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, phoneFormatValue, type, valueRef]);

  // type="number" handling
  useEffect(() => {
    if (type !== 'number') {
      return;
    }

    valueRef.current = numberValue;
    updateRootValue();
  }, [numberValue, type, updateRootValue, valueRef]);

  // generating of className of metric data
  useEffect(() => {
    switch (length) {
      case 'lg':
        setMetricClassName('input--metric-length-lg');
        break;
      case 'md':
        setMetricClassName('input--metric-length-md');
        break;
      case 'sm':
        setMetricClassName('input--metric-length-sm');
        break;
      default:
        return '';
    }
  }, [length]);

  function updatePhoneNumber() {
    const formattedValue = toPhoneFormat(inputValue);
    // setPhoneFormatValue('');
    setPhoneFormatValue(formattedValue);

    valueRef.current = phoneFormatValue;
    updateRootValue();
  }

  const handleOnChange = event => {
    onChange && onChange(event);

    const { value } = event.target;
    const parsedValue = parsePhoneNumber(value);

    type === 'tel' ? setInputValue(parsedValue) : setNumberValue(value);
  };

  const disableBackspaceKey = event => {
    console.log('EVENT-KEY IS :', event.key);

    if (event.key === 'Backspace' && inputValue === phonePrefix) {
      event.preventDefault();
    }

    console.log('length :', inputValue.length);

    if (event.key === 'ArrowLeft' && inputValue.length <= 4) {
      event.preventDefault();
    }
  };

  return (
    <>
      <input
        {...props}
        type={type === 'number' ? 'text' : 'tel'}
        className={`${className} ${styles['input--metric']}`}
        inputMode={type === 'number' ? 'numeric' : 'tel'}
        placeholder="00.00"
        aria-label={type === 'number' && 'Числове значення.'}
        data-type={type === 'number' ? 'number' : type}
        onChange={handleOnChange}
        minLength={8}
        maxLength={18}
        onKeyDown={disableBackspaceKey}
      />
      {showMetricalParams && (
        <span className={styles[metricClassName]}>
          {metrical === 'm3' ? 'м³' : metrical}
        </span>
      )}
    </>
  );
}
