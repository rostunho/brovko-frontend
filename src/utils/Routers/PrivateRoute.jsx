import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { memoizedSelectLoginAndToken } from 'redux/user/userSelectors';

import Loader from 'components/Loader';

const PrivateRoute = () => {
  const { isLogin, token } = useSelector(memoizedSelectLoginAndToken);

  // console.log('isLogin>>>>>>>', isLogin);
  // console.log('token>>>>>>>', token);

  if (!isLogin && token) {
    return <Loader />;
  }

  if (!isLogin && !token) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
