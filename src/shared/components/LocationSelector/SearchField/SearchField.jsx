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
  ...props
}) {
  const handleOnClick = event => {
    onClick && onClick(event);
  };

  return (
    <label className={styles.label}>
      {label}
      <input
        {...props}
        type="search"
        value={value}
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
        data-ref={dataRef}
        // onClick={onClick}
      />
      <button type="button" className={styles.button} onClick={handleOnClick}>
        {selectorIsOpen || selectedData ? <CrossIcon /> : <ArrowDownIcon />}
      </button>
    </label>
  );
}
