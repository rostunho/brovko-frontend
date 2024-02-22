import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserStatus } from 'redux/user/userSelectors.js';
import Loader from 'components/Loader';

const AdminRoute = () => {
  const userStatus = useSelector(selectUserStatus);
  const isAdminOrSuperadmin = userStatus === 'manager' || userStatus === 'superadmin';

  console.log(isAdminOrSuperadmin)

  if (!isAdminOrSuperadmin) {
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
