import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Navigate } from 'react-router-dom';

import { googleAuth } from 'redux/user/userOperations';
import { memoizedSelectLoginAndToken } from 'redux/user/userSelectors';
import useProductInBasket from 'shared/hooks/useProductInBasket';
import { selectUser } from 'redux/user/userSelectors';
import { update } from 'redux/user/userOperations';
import Loader from 'components/Loader';

const TempAuthPage = () => {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const { user } = useSelector(selectUser);
  const { showBascketOrders } = useProductInBasket();
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState(() => showBascketOrders());

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('refreshToken', refreshToken);
    if (accessToken) {
      dispatch(googleAuth(accessToken));
    }
  }, [accessToken, refreshToken, dispatch]);

  const { isLogin } = useSelector(memoizedSelectLoginAndToken);

  useEffect(() => {
    if (isLogin && products.length > 0) {
      const updatedUser = {
        id: user._id,
        ...user,
        productInBasket: products,
      };
      dispatch(update(updatedUser));
    }
  }, [isLogin, products, user, dispatch]);

  if (!isLogin && accessToken) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (isLogin) {
    return <Navigate to="/shop/product-list-page" replace />;
  }

  return null;
};
export default TempAuthPage;
