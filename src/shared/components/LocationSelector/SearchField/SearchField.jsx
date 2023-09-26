import ArrowDownIcon from 'shared/icons/ArrowDownIcon';
import CrossIcon from 'shared/icons/CrossIcon';
import styles from './SearchField.module.scss';

export default function SearchField({
  label,
  selectorIsOpen,
  onChange,
  onClick,
  ...props
}) {
  const handleOnClick = event => {
    onClick && onClick(event);
    console.log(onClick);
  };

  return (
    <label className={styles.label}>
      {label}
      <input type="search" className={styles.input} onChange={onChange} />
      <button type="button" className={styles.button} onClick={handleOnClick}>
        {selectorIsOpen ? <CrossIcon /> : <ArrowDownIcon />}
      </button>
    </label>
  );
}
