import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import Heading from 'shared/components/Heading/Heading';
import UserDataHeading from 'components/UserDashboard/UserDataHeading';
import InsideOrdersHistory from './InsideOrdersHistory/InsideOrdersHistory';
import { ordersUserHistory } from 'redux/user/userSelectors';
import { usersOrdersHistory } from 'redux/user/userOperations';

import styles from './OrdersHistory.module.scss';

const OrdersHistory = () => {
  const orders = useSelector(ordersUserHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersOrdersHistory());
  }, [dispatch]);

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
        Історія замовлень ({orders ? orders.length : 0})
      </UserDataHeading>
      {showInfo && (
        <div className={styles.userInfo}>
          <InsideOrdersHistory />
        </div>
      )}
    </>
  );
};

export default OrdersHistory;
