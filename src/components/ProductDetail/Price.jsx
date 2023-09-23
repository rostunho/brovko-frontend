import Button from 'shared/components/Button';
import QuantityButton from 'shared/components/QuantityButton/QuantityButton';
import QuantityButtonModal from 'shared/components/QuantityButtonModal/QuantityButtonModal';

import styles from './ProductDetail.module.scss';

export default function Price({ price, currencyId }) {
  return (
    <div className={styles.price}>
      <h3>
        {price} {currencyId}
      </h3>
      <div className={styles.amount}>
        {/* <QuantityButton /> */}
        <QuantityButtonModal
          mode={'outlined'}
          size={'l'}
          // style={{ minWidth: '24px', fill: '#f3a610' }}
        />
        {/* <h3>1</h3>
        <Button mode={'adding'} style={{ minWidth: '24px', fill: '#f3a610' }} /> */}
      </div>
    </div>
  );
}
