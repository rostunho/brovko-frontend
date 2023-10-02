import { useEffect, useState } from 'react';
import QuntityButtons from './QuantityButtons';
import Image from '../Image';
import BasketSmall from 'shared/icons/BasketSmall';
import { useDispatch } from 'react-redux';

import { deleteOrder, changeQuantity } from 'redux/basket/basketSlice';

import styles from './QuantityButtonModal.module.scss';

const QuantityButtonModal = ({
  id,
  picture,
  name,
  note,
  price,
  currencyId,
  val,
}) => {
  console.log('val', val);
  const [value, setValue] = useState(val || 1);
  const currentPrice = price * value;

  const dispatch = useDispatch();

  const hahdleBasketClick = () => {
    dispatch(deleteOrder());
  };

  useEffect(() => {
    console.log(value);
    if (value !== 1) {
      dispatch(changeQuantity({ id, value }));
    }
  }, [value]);

  return (
    <div className={styles['wrapper-allproduct']}>
      <div className={styles['wrapper-imageblock']}>
        <Image height={80} width={80} src={picture[0]} />
      </div>
      <div className={styles['wrapper-quantityblock']}>
        <p className={styles['text-product']}>{name}</p>
        <p className={styles['text-product']}>{note}</p>
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
          {currentPrice}
          <span>₴</span>
        </p>
      </div>
    </div>
  );
};

export default QuantityButtonModal;
