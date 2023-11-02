import { useState } from 'react';

// import Heading from 'shared/components/Heading/Heading';
import UserDataHeading from 'components/UserDashboard/UserDataHeading';
import InsideOrdersHistory from './InsideOrdersHistory/InsideOrdersHistory';

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
      {showInfo && (
        <div className={styles.userInfo}>
          <InsideOrdersHistory></InsideOrdersHistory>
        </div>
      )}
    </>
  );
};

export default OrdersHistory;
