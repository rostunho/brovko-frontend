import ArrowDownIcon from 'shared/icons/ArrowDownIcon';
import CrossIcon from 'shared/icons/CrossIcon';
import styles from './SearchField.module.scss';

export default function SearchField({
  label,
  value,
  selectorIsOpen,
  selectedCity,
  onChange,
  onClick,
  placeholder,
  ...props
}) {
  const handleOnClick = event => {
    onClick && onClick(event);
  };

  return (
    <label className={styles.label}>
      {label}
      <input
        type="search"
        value={value}
        className={styles.input}
        placeholder={placeholder}
        onChange={onChange}
        // onClick={onClick}
      />
      <button type="button" className={styles.button} onClick={handleOnClick}>
        {selectorIsOpen || selectedCity ? <CrossIcon /> : <ArrowDownIcon />}
      </button>
    </label>
  );
}
