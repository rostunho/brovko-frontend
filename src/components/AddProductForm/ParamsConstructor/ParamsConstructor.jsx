import { useState } from 'react';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import Prompt from 'shared/components/Prompt';
import AddingPlusIcon from 'shared/icons/AddingPlusIcon';
import AddingMinusIcon from 'shared/icons/AddingMinusIcon';
import styles from './ParamsConstructor.module.scss';

export default function ParamsConstructor() {
  const [showParams, setShowParams] = useState(false);

  return (
    <>
      <div className={styles.heading}>
        <button
          type="button"
          className={styles['dropdown-button']}
          onClick={() => setShowParams(!showParams)}
        >
          <DropdownArrowIcon
            size={24}
            className={styles['dropdown-icon']}
            style={{ rotate: showParams ? '180deg' : '0deg' }}
          />
          Характеристики
        </button>
        {showParams && (
          <Prompt className={styles.prompt}>
            Порожній заголовок на cторінці товару не відображатиметься
          </Prompt>
        )}
      </div>
      {showParams && (
        <div>
          <ul className={styles['fields-list']}>
            <li className={styles.item}>
              <input className={styles.input} />
              <input className={styles.input} />
            </li>
            <li className={styles.item}>
              <input className={styles.input} />
              <input className={styles.input} />
            </li>
            <li className={styles.item}>
              <input className={styles.input} />
              <input className={styles.input} />
            </li>
            <li className={styles.item}>
              <input className={styles.input} />
              <input className={styles.input} />
            </li>
            <li className={styles.item}>
              <input className={styles.input} />
              <input className={styles.input} />
            </li>
          </ul>
          <ul className={styles['buttons-list']}>
            <button type="button" className={styles['quantity-button']}>
              <AddingMinusIcon />
              Забрати позицію
            </button>
            <button type="button" className={styles['quantity-button']}>
              Додати позицію
              <AddingPlusIcon />
            </button>
          </ul>
        </div>
      )}
    </>
  );
}
