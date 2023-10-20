import { useState, useEffect } from 'react';
import { toPhoneFormat, parsePhoneNumber } from 'utils';
import styles from './NumericInput.module.scss';

export default function NumericInput({ value, ...props }) {
  const { type, placeholder, metrical, currency, length, className, onChange } =
    props;

  const phonePrefix = '+380';
  const [phoneValue, setInputValue] = useState(phonePrefix);
  const [metricClassName, setMetricClassName] = useState('');
  const showMetricalParams = metrical && length !== 'lg';
  const showCurrencyParams = currency && length !== 'lg';

  // generating of className of metric data
  // прибрати, якщо в підсумку стилі середнього і короткого інтпутів не відрізнятимуться
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

  const handleOnChange = event => {
    onChange && onChange(event);

    type === 'tel' && setInputValue(parsePhoneNumber(event.target.value));
  };

  const handleKeyDown = event => {
    disableBackKeys(event);
    allowCharacters(event);
  };

  const handleDoubleClick = event => {
    event.target.select();
  };

  const handleMouseUp = event => {
    const { selectionStart, selectionEnd, value } = event.target;
    selectionStart === 0 &&
      selectionEnd === value.length &&
      event.target.select();
  };

  const disableBackKeys = event => {
    const { selectedStart, selectedEnd } = event.target;
    event.key === 'Backspace' &&
      phoneValue === phonePrefix &&
      selectedStart > 6 &&
      selectedStart === selectedEnd &&
      event.preventDefault();
    event.key === 'ArrowLeft' &&
      phoneValue.length <= 4 &&
      event.preventDefault();
  };

  const allowCharacters = event => {
    const keyCode = event.keyCode || event.which;
    const key = event.key;
    const allowedCharacters = ['+', '(', ')', ' '];
    if (allowedCharacters.includes(key)) {
      return;
    }
    if (
      (keyCode >= 48 && keyCode <= 57) || // 0-9
      (keyCode >= 37 && keyCode <= 40) || // Клавіші навігації (стрілки)
      keyCode === 16 || // Shift
      keyCode === 17 || // Ctrl
      keyCode === 13 || // Enter
      keyCode === 9 || // Tab
      keyCode === 8 // Backspace
    ) {
      return;
    }
    keyCode === 36 && event.target.setSelectionRange(6, 6);
    event.preventDefault();
  };

  const setCursorStartPosition = event => {
    const { onFocus, onClick } = props;
    onFocus && onFocus();
    onClick && onClick();
    const { selectionStart } = event.target;
    selectionStart < 6 && event.target.setSelectionRange(6, 6);
  };

  return (
    <>
      {showCurrencyParams && (
        <span className={styles.currency}>{currency}</span>
      )}
      <input
        {...props}
        type={type === 'number' ? 'text' : 'tel'}
        className={`${className} ${styles[`input--numeric-${length}`]} ${
          metrical ? styles['input--metric'] : ''
        }`}
        inputMode={type === 'number' ? 'numeric' : 'tel'}
        placeholder={placeholder}
        aria-label={type === 'number' && 'Number'}
        data-type={type}
        onChange={handleOnChange}
        minLength={type === 'tel' ? 8 : 1}
        maxLength={18}
        onClick={setCursorStartPosition}
        onDoubleClick={handleDoubleClick}
        onFocus={setCursorStartPosition}
        onKeyDown={handleKeyDown}
        onMouseUp={handleMouseUp}
        value={type === 'tel' ? toPhoneFormat(phoneValue) : value && value}
      />
      {showMetricalParams && (
        <span className={styles[metricClassName]}>
          {metrical === 'м3' ? 'м³' : metrical}
        </span>
      )}
    </>
  );
}
