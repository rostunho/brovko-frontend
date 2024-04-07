import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogin } from 'redux/user/userSelectors';
import SharedLayout from 'components/SharedLayout/SharedLayout';
import AllUsersRoutes from 'components/Routes/AllUsersRoutes';
import ProductsRoutes from 'components/Routes/ProductsRoutes';
import AuthRoutes from 'components/Routes/AuthRoutes';
import AdminRoutes from 'components/Routes/AdminRoutes';
import PublicRoute from 'utils/Routers/PublicRoute';
import PrivateRoute from 'utils/Routers/PrivateRoute';
import AdminRoute from 'utils/Routers/AdminRoute';
import OrderRoutes from 'components/Routes/OrderRoutes';
import Loader from 'components/Loader';

const LazyUserDashboardPage = lazy(() =>
  import('pages/UserDashboardPage/UserDashboardPage')
);
const LazyMainPage = lazy(() => import('pages/MainPage/MainPage'));
const LazyNotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));
const TestingPage = lazy(() => import('pages/Testing/TestingPage'));
const LoginDemoPage = lazy(() => import('pages/LoginDemoPage/LoginDemoPage'));

function App() {
  const userIsLogin = useSelector(selectIsLogin);
  console.log('userIsLogin :>> ', userIsLogin);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={userIsLogin ? <SharedLayout /> : <LoginDemoPage />}
        >
          {userIsLogin && <Route index element={<Navigate to="/main" />} />}
          <Route path="/main" element={<LazyMainPage />} />

          <Route element={<PublicRoute />}>
            <Route path="/shop/*" element={<ProductsRoutes />} />
            <Route path="/all/*" element={<AllUsersRoutes />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/order/*" element={<OrderRoutes />} />
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
    </Suspense>
  );
}

export default App;
