import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserStatus } from 'redux/user/userSelectors.js';
import Loader from 'components/Loader';

const AdminRoute = () => {
  const userStatus = useSelector(selectUserStatus);
  console.log('userStatus :>> ', userStatus);
  const isAdminOrSuperadmin =
    userStatus === 'manager' || userStatus === 'superadmin';

  console.log(isAdminOrSuperadmin);

  if (userStatus && !isAdminOrSuperadmin) {
    return (
      <>
        <Loader />
        <Navigate to="/" />;
      </>
    );
  }

  return <Outlet />;
};

export default AdminRoute;
