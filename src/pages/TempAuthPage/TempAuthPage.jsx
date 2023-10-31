import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Navigate } from 'react-router-dom';

import { googleAuth } from 'redux/user/userOperations';
import { memoizedSelectLoginAndToken } from 'redux/user/userSelectors';
import Loader from 'components/Loader';

const TempAuthPage = () => {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('refreshToken', refreshToken);
    if (accessToken) {
      dispatch(googleAuth(accessToken));
    }
  }, [accessToken, refreshToken, dispatch]);

  const { isLogin } = useSelector(memoizedSelectLoginAndToken);
  console.log('isLogin', isLogin);

  if (!isLogin && accessToken) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (isLogin) {
    return <Navigate to="/main" replace />;
  }
  return null;
};
export default TempAuthPage;
