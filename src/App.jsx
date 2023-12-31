import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogin } from 'redux/user/userSelectors';

import { lazy } from 'react';
// import './index.css';

import SharedLayout from 'components/SharedLayout/SharedLayout';
import AllUsersRoutes from 'components/Routes/AllUsersRoutes';
import ProductsRoutes from 'components/Routes/ProductsRoutes';
import AuthRoutes from 'components/Routes/AuthRoutes';
import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
import LoginForm from 'components/AuthSection/LoginForm/LoginForm';
import OrderForm from 'components/OrderForm/OrderForm';
const LazyMainPage = lazy(() => import('pages/MainPage/MainPage'));
const LazyNotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

const OrderPage = lazy(() => import('pages/OrderPage'));
const AdminPage = lazy(() => import('pages/AdminPage'));
const TestingPage = lazy(() => import('pages/Testing/TestingPage'));

function App() {
  const userIsLogin = useSelector(selectIsLogin);
  // console.log('userIsLogin :>> ', userIsLogin);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Navigate to="/main" />} />
        <Route path="/main" element={<LazyMainPage />} />

        <Route path="/all/*" element={<AllUsersRoutes />} />

        <Route path="/shop/*" element={<ProductsRoutes />} />

        <Route path="/auth/*" element={<AuthRoutes />} />

        <Route path="/admin" element={<AdminPage />}>
          <Route path=":productId" element={<AdminPage />} />
        </Route>

        <Route path="/order" element={<OrderPage />}>
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

        <Route path="/testing" element={<TestingPage />} />

        {/* Not Found */}
        <Route path="*" element={<LazyNotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
