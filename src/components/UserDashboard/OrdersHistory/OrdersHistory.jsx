import { useState } from 'react';

import Heading from 'shared/components/Heading/Heading';

import styles from './OrdersHistory.module.scss';

const OrdersHistory = () => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleShowingInfo = () => {
    setShowInfo(!showInfo);
  };
  return (
    <>
      <div onClick={toggleShowingInfo} className={styles.heading}>
        <Heading type="h3">Історія замовлень</Heading>
      </div>
      {showInfo && <div className={styles.userInfo}>Блок відкрито</div>}
    </>
  );
};

export default OrdersHistory;
