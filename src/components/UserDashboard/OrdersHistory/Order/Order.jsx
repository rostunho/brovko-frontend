import Image from 'shared/components/Image';

import styles from './Order.module.scss';

const Order = ({
  id,
  picture,
  name,
  note,
  price,
  quantity,
  currencyId,
  val,
  setModalDelete,
  setOrderId,
}) => {
  return (
    <>
      <div className={styles['wrapper-allproduct']}>
        <div className={styles['wrapper-imageblock']}>
          <Image height={80} width={80} src={picture} />
        </div>
        <div className={styles['wrapper-text']}>
          <div className={styles['wrapper-text-product']}>
            <p className={styles['text-product']}>{name}</p>
            <p className={styles['text-product']}>{note}</p>
          </div>
          <div className={styles['wrapper-total']}>
            <p className={styles['total']}>{quantity} шт</p>
            <p className={styles['total']}>{price} ₴</p>
          </div>
        </div>
      </div>
      <div />
    </>
  );
};

export default Order;
