import AddingPlusIcon from 'shared/icons/AddingPlusIcon';

import AddingMinusIcon from 'shared/icons/AddingMinusIcon';
import Image from '../Image';
import BasketSmall from 'shared/icons/BasketSmall';

import styles from './QuantityButtonModal.module.scss';

const QuantityButtonModal = ({ value = 1, setValue }) => {
  const addOne = () => {
    setValue(prevValue => prevValue + 1);
  };

  const minusOne = () => {
    setValue(prevValue => prevValue - 1);
  };

  return (
    <>
      <div className={styles['wrapper-allproduct']}>
        <div className={styles['wrapper-imageblock']}>
          <Image height={80} width={80} />
        </div>
        <div className={styles['wrapper-textblock']}>
          <div className={styles['wrapper-textandbasket']}>
            <p className={styles['text-product']}>Паляничка</p>
            <BasketSmall />
          </div>
          <p className={styles['text-product']}>Вим’я-кокос-лохина</p>

          <div className={styles['wrapper-quantityandtotal']}>
            <div className={styles['quantity-container']}>
              <button
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
              </button>
            </div>
            <p className={styles['total']}>
              0<span>₴</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuantityButtonModal;
