import { useState } from 'react';

import QuantityButtons from 'shared/components/QuantityButtonModal/QuantityButtons';

import styles from '../ProductDetail.module.scss';

export default function Price({ price, currencyId }) {
  const [value, setValue] = useState(1);
  return (
    <div className={styles.price}>
      <h3>
        {price} {currencyId}
      </h3>
      <QuantityButtons value={value} setValue={setValue} />
    </div>
  );
}
