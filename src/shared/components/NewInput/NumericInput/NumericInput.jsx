import { useState, useEffect } from 'react';
import { toPhoneFormat } from 'utils';
import styles from './NumericInput.module.scss';

export default function NumericInput({ rootValueHandling, ...props }) {
  const { type, metrical, length, className, onChange } = props;

  const { valueRef, updateRootValue } = rootValueHandling;
  const phonePrefix = '+380';
  const [phoneValue, setPhoneValue] = useState(phonePrefix);
  //   const [phoneValue, setPhoneValue] = useState('');
  //   const [phoneBody, setPhoneBody] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [metricClassName, setMetricClassName] = useState('');
  //   const [isFirstRender, setIsFirstRender] = useState(true);
  const showMetricalParams = metrical && length !== 'lg';
  //   console.log('NUMBER VALUE: ', typeof numberValue);
  //   console.log('NUMBER VALUE: ', numberValue);

  useEffect(() => {
    if (type !== 'tel') {
      return;
    }

    valueRef.current = setFullPhoneNumber();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneValue, type, valueRef]);

  useEffect(() => {
    if (type !== 'number') {
      return;
    }
    valueRef.current = numberValue;
    updateRootValue();
  }, [numberValue, type, updateRootValue, valueRef]);

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

  function setFullPhoneNumber() {
    valueRef.current = '';
    updateRootValue();
    const formattedValue = toPhoneFormat(phoneValue);
    console.log('!!!!!  :', formattedValue);
    valueRef.current = formattedValue;
    updateRootValue();
  }

  //   const updatePhoneValue = value => {
  //     setPhoneValue();
  //   };

  const handleOnChange = event => {
    onChange && onChange(event);
    const { value } = event.target;
    // setPhoneValue('');
    // console.log('TESTING :', normalizePhoneValue(value));

    type === 'tel' ? setPhoneValue(value) : setNumberValue(value);
  };

  //   const normalizePhoneValue = value => {
  //     const temp = value.split().splice(0, 4).join();
  //     console.log('TEMP1 :', temp);
  //     const temp2 = toPhoneFormat(temp);
  //     console.log('TEMP2 :', temp2);
  //     // setPhoneValue(temp2);
  //     return temp2;
  //   };

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
      />
      {showMetricalParams && (
        <span className={styles[metricClassName]}>
          {metrical === 'm3' ? 'м³' : metrical}
        </span>
      )}
    </>
  );
}
