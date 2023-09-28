import { useState } from 'react';
import QuntityButtons from './QuantityButtons';
import Image from '../Image';
import BasketSmall from 'shared/icons/BasketSmall';

import styles from './QuantityButtonModal.module.scss';

const QuantityButtonModal = () => {
  const [value, setValue] = useState(1);

  // const addOne = () => {
  //   setValue(prevValue => prevValue + 1);
  // };

  // const minusOne = () => {
  //   setValue(prevValue => prevValue - 1);
  // };

  return (
    <div className={styles['wrapper-allproduct']}>
      <div className={styles['wrapper-imageblock']}>
        <Image height={80} width={80} />
      </div>
      <div className={styles['wrapper-quantityblock']}>
        <p className={styles['text-product']}>Паляничка</p>
        <p className={styles['text-product']}>Вим’я-кокос-лохина</p>

        <div className={styles['quantity-container']}>
          {/* <button
            className={styles['plus-button']}
            type="button"
            onClick={addOne}
            disabled={value >= 99}
          >
            <AddingPlusIcon />
          </button>
          <p className={styles['value']}>{value}</p>
          <button
            className={styles['minus-button']}
            type="button"
            onClick={minusOne}
            disabled={value <= 1}
          >
            <AddingMinusIcon />
          </button> */}
          <QuntityButtons value={value} setValue={setValue} />
        </div>
      </div>
      <div className={styles['wrapper-basketblock']}>
        <BasketSmall />
        <p className={styles['total']}>
          0<span>₴</span>
        </p>
      </div>
    </div>
  );
};

export default QuantityButtonModal;
