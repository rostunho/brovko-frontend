import { useState, useEffect } from 'react';
import ArrowDownIcon from 'shared/icons/ArrowDownIcon';
import CrossIcon from 'shared/icons/CrossIcon';
import styles from './SearchField.module.scss';

export default function SearchField({
  label,
  value,
  name,
  selectorIsOpen,
  selectedData,
  onChange,
  onClick,
  placeholder,
  dataRef,
  // clearData,
  selector,
  ...props
}) {
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  // const handleOnClick = event => {
  //   onClick && onClick(event);
  // };

  const onCrossClick = () => {
    // console.log('ONCROSS CKLICKING');
    selector?.clear && selector.clear();
  };

  const toggleSelector = () => {
    selector?.toggle && selector.toggle();
  };

  return (
    <div className={styles.label}>
      <label htmlFor={name}>{label}</label>
      <input
        {...props}
        type="search"
        id={name}
        name={name}
        value={currentValue}
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
        data-ref={dataRef}
        // onClick={onClick}
      />
      {/* <button type="button" className={styles.button} onClick={handleOnClick}> */}
      <button type="button" className={styles.button}>
        {selectorIsOpen || selectedData || value ? (
          <CrossIcon onClick={onCrossClick} />
        ) : (
          <ArrowDownIcon onClick={toggleSelector} />
        )}
      </button>
    </div>
  );
}
