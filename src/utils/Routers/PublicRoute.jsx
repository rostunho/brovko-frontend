import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectLoginAndToken } from 'redux/user/userSelectors';

import Loader from 'components/Loader';

const PublicRoute = () => {
  const { isLogin, token } = useSelector(selectLoginAndToken );
  console.log('isLogin, token', isLogin, token)

  if (!isLogin && token) {
    return <Loader />;
  }

//   if (isLogin) {
//     return <Navigate to="/user" />;
//   }
  
  return <Outlet />;
};

export default PublicRoute;