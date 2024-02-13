import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { logout } from 'redux/user/userOperations';
import { selectIsLogin } from 'redux/user/userSelectors';

import Heading from 'shared/components/Heading/Heading';
import PersonalData from 'components/UserDashboard/PersonalData/PersonalData';
import Contacts from 'components/UserDashboard/Contacts/Contacts';
import OrdersHistory from 'components/UserDashboard/OrdersHistory/OrdersHistory';
import Avatar from 'components/Avatar';

import styles from './UserDashboardPage.module.scss';

export default function UserDashboardPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";

  const dispatch = useDispatch();
  const isUserLogin = useSelector(selectIsLogin);

  const onLogout = () => {
    // console.log('click');
    dispatch(logout());
  };

  if (!isUserLogin) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <Heading withGoBack fromHC={backLinkHref}>Мій профіль</Heading>

      <Avatar />
      <div className={styles.dataContainer}>
        <PersonalData />
        <Contacts />
        <OrdersHistory />
        <p className={styles.logoutBtn} onClick={onLogout}>
          Вийти
        </p>
      </div>
    </>
  );
}
