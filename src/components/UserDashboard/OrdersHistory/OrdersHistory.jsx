import { useState } from 'react';

// import Heading from 'shared/components/Heading/Heading';
import UserDataHeading from 'shared/components/UserDataHeading';

import styles from './OrdersHistory.module.scss';

const OrdersHistory = () => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleShowingInfo = () => {
    setShowInfo(!showInfo);
  };
  return (
    <>
      {/* <div onClick={toggleShowingInfo} className={styles.heading}>
        <Heading type="h3">Історія замовлень</Heading>
      </div> */}
      <UserDataHeading onClick={toggleShowingInfo} opened={showInfo}>
        Історія замовлень
      </UserDataHeading>
      {showInfo && <div className={styles.userInfo}>Блок відкрито</div>}
    </>
  );
};

export default OrdersHistory;
