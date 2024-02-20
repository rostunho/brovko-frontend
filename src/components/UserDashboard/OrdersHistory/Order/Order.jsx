import Image from 'shared/components/Image';

import styles from './Order.module.scss';

const Order = ({
  id,
  picture,
  name,
  note,
  price,
  val,
  quantity,
  currencyId,
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
          </div>
          <div className={styles['wrapper-total']}>
            <p className={styles['total']}>{val} шт</p>
            <p className={styles['total1']}>{price * val} ₴</p>
          </div>
        </div>
      </div>
      <div />
    </>
  );
};

export default Order;
