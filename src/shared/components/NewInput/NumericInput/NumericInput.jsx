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
      inputValue === phonePrefix &&
      selectedStart > 6 &&
      selectedStart === selectedEnd &&
      event.preventDefault();

    event.key === 'ArrowLeft' &&
      inputValue.length <= 4 &&
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
      <input
        {...props}
        type={type === 'number' ? 'text' : 'tel'}
        className={`${className} ${styles['input--metric']}`}
        inputMode={type === 'number' ? 'numeric' : 'tel'}
        placeholder="00.00"
        aria-label={type === 'number' && 'Number'}
        data-type={type}
        onChange={handleOnChange}
        minLength={8}
        maxLength={18}
        onClick={setCursorStartPosition}
        onDoubleClick={handleDoubleClick}
        onFocus={setCursorStartPosition}
        onKeyDown={handleKeyDown}
        onMouseUp={handleMouseUp}
      />
      {showMetricalParams && (
        <span className={styles[metricClassName]}>
          {metrical === 'm3' ? 'м³' : metrical}
        </span>
      )}
    </>
  );
}
