import AddingPlusIcon from 'shared/icons/AddingPlusIcon';
import AddingMinusIcon from 'shared/icons/AddingMinusIcon';
import styles from './LineQuantittyButtons.module.scss';
import { removeListener } from '@reduxjs/toolkit';

export default function LineQuantittyButtons({
  addAction,
  removeAction,
  addLabel,
  removeLabel,
  ...props
}) {
  return (
    <ul className={styles['buttons-list']}>
      <li>
        <button
          type="button"
          className={styles['quantity-button']}
          onClick={removeAction}
        >
          <AddingMinusIcon />
          {removeLabel || 'Забрати'}
        </button>
      </li>

      <li>
        <button
          type="button"
          className={styles['quantity-button']}
          onClick={addAction}
        >
          {addLabel || 'Додати'}
          <AddingPlusIcon />
        </button>
      </li>
    </ul>
  );
}
