import { useEffect, useState } from 'react';
import QuntityButtons from './QuantityButtons';
import Image from '../Image';
import BasketSmall from 'shared/icons/BasketSmall';
import { useDispatch } from 'react-redux';

import { deleteOrder, changeQuantity } from 'redux/basket/basketSlice';

import styles from './QuantityButtonModal.module.scss';

const QuantityButtonModal = () => {
  const [value, setValue] = useState(1);

  const dispatch = useDispatch();

  const hahdleBasketClick = () => {
    dispatch(deleteOrder());
  };

  // useEffect(() => {
  //   dispatch(changeQuantity({ quantity: value }));
  // }, [dispatch, value]);

  return (
    <div className={styles['wrapper-allproduct']}>
      <div className={styles['wrapper-imageblock']}>
        <Image height={80} width={80} />
      </div>
      <div className={styles['wrapper-quantityblock']}>
        <p className={styles['text-product']}>Паляничка</p>
        <p className={styles['text-product']}>Вим’я-кокос-лохина</p>
        <div className={styles['quantityButtoms-container']}>
          <QuntityButtons value={value} setValue={setValue} />
        </div>
      </div>
      <div className={styles['wrapper-basketblock']}>
        <button
          className={styles['minus-button']}
          type="button"
          onClick={hahdleBasketClick}
        >
          <BasketSmall />
        </button>

        <p className={styles['total']}>
          0<span>₴</span>
        </p>
      </div>
    </div>
  );
};

export default QuantityButtonModal;
