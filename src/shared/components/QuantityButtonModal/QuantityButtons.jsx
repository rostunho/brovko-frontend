import AddingPlusIcon from 'shared/icons/AddingPlusIcon';
import AddingMinusIcon from 'shared/icons/AddingMinusIcon';
import styles from './QuantityButtonModal.module.scss';

export default function QuntityButtons({
  value,
  setValue,
  buttonStyles,
  valueStyles,
  hadleQuantityClick,
  className,
}) {
  const addOne = () => {
    setValue(prevValue => prevValue + 1);
  };

  const minusOne = () => {
    setValue(prevValue => prevValue - 1);
  };
  return (
    <div
      className={`${styles['quantity-container']} ${
        className ? className : ''
      }`}
    >
      <button
        className={styles['minus-button']}
        type="button"
        onClick={minusOne}
        disabled={value <= 1}
      >
        <AddingMinusIcon />
      </button>
      <p className={`${styles['value']} ${styles['custom-value']}`}>{value}</p>

      <button
        className={styles['plus-button']}
        type="button"
        onClick={addOne}
        disabled={value >= 99}
      >
        <AddingPlusIcon />
      </button>
    </div>
  );
}
