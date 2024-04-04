import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogin } from 'redux/user/userSelectors';
import Loader from 'components/Loader';

const AuthFormWrapper = lazy(() =>
  import('components/AuthSection/AuthFormWrapper/AuthFormWrapper')
);
const LoginForm = lazy(() =>
  import('components/AuthSection/LoginForm/LoginForm')
);
const OrderForm = lazy(() => import('components/OrderForm/OrderForm'));
const OrderPage = lazy(() => import('pages/OrderPage'));

export default function OrderRoutes() {
  const userIsLogin = useSelector(selectIsLogin);
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<OrderPage />}>
          <Route
            index
            element={
              <Navigate
                to={userIsLogin ? '/order/order-form' : '/order/login'}
                replace
              />
            }
          />
          <Route
            path="login"
            element={<AuthFormWrapper form={<LoginForm />} />}
          />
          <Route path="order-form" element={<OrderForm />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
