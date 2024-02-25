import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectIsLogin } from 'redux/user/userSelectors';
import { lazy } from 'react';
import SharedLayout from 'components/SharedLayout/SharedLayout';
import AllUsersRoutes from 'components/Routes/AllUsersRoutes';
import ProductsRoutes from 'components/Routes/ProductsRoutes';
import AuthRoutes from 'components/Routes/AuthRoutes';
import AdminRoutes from 'components/Routes/AdminRoutes';
import PublicRoute from 'utils/Routers/PublicRoute';
import PrivateRoute from 'utils/Routers/PrivateRoute';
import AdminRoute from 'utils/Routers/AdminRoute';
import OrderRoutes from 'components/Routes/OrderRoutes';

// const AuthFormWrapper = lazy(() =>
//   import('components/AuthSection/AuthFormWrapper/AuthFormWrapper')
// );
// const LoginForm = lazy(() =>
//   import('components/AuthSection/LoginForm/LoginForm')
// );

// const OrderForm = lazy(() => import('components/OrderForm/OrderForm'));
// const OrderPage = lazy(() => import('pages/OrderPage'));

const LazyUserDashboardPage = lazy(() =>
  import('pages/UserDashboardPage/UserDashboardPage')
);
const LazyMainPage = lazy(() => import('pages/MainPage/MainPage'));
const LazyNotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));
const TestingPage = lazy(() => import('pages/Testing/TestingPage'));


function App() {
  // const userIsLogin = useSelector(selectIsLogin);
  // console.log('userIsLogin :>> ', userIsLogin);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Navigate to="/main" />} />
        <Route path="/main" element={<LazyMainPage />} />
      
   
        <Route element={<PublicRoute/>}>
              <Route path="/shop/*" element={<ProductsRoutes />} />
              <Route path="/all/*" element={<AllUsersRoutes />} />
              <Route path="/auth/*" element={<AuthRoutes />} /> 
              <Route path='/order/*' element={<OrderRoutes/>} />
        </Route>

        <Route element={<PrivateRoute />}>     
              <Route path="/user" element={<LazyUserDashboardPage />} />
        </Route>

        <Route element={<AdminRoute />}>
             <Route path="/admin/*" element={<AdminRoutes />} />
        </Route>

        <Route path="*" element={<LazyNotFoundPage />} />

        <Route path="/testing" element={<TestingPage />} />

      </Route>
    </Routes>
  );
}

export default App;
