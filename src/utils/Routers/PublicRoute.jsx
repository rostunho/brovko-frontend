import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { memoizedSelectLoginAndToken } from 'redux/user/userSelectors';

import Loader from 'components/Loader';

const PublicRoute = () => {
  const { isLogin, token } = useSelector(memoizedSelectLoginAndToken);
  // console.log('isLogin, token', isLogin, token);

  if (!isLogin && token) {
    return <Loader />;
  }

  //   if (isLogin) {
  //     return <Navigate to="/user" />;
  //   }

  return <Outlet />;
};

export default PublicRoute;
