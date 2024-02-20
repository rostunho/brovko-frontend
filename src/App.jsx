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
import AdminRoutes from 'components/Routes/AdminRoutes';

const AuthFormWrapper = lazy(() =>
  import('components/AuthSection/AuthFormWrapper/AuthFormWrapper')
);
const LoginForm = lazy(() =>
  import('components/AuthSection/LoginForm/LoginForm')
);
const LazyUserDashboardPage = lazy(() =>
  import('pages/UserDashboardPage/UserDashboardPage')
);
const OrderForm = lazy(() => import('components/OrderForm/OrderForm'));
const LazyMainPage = lazy(() => import('pages/MainPage/MainPage'));
const LazyNotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

const OrderPage = lazy(() => import('pages/OrderPage'));
const AdminPage = lazy(() => import('pages/AdminPage'));
const TestingPage = lazy(() => import('pages/Testing/TestingPage'));
const ModerateReviewPage = lazy(() =>
  import('pages/ModerateReviewPage/ModerateReviewPage')
);
const FeedbackPage = lazy(() => import('pages/FeedbackPage/FeedbackPage'));
const NewReviews = lazy(() =>
  import('components/Reviews/NewReviews/NewReviews')
);

const ApprovedReviews = lazy(() =>
  import('components/Reviews/ApprovedReviews/ApprovedReviews')
);
const RejectedReviews = lazy(() =>
  import('components/Reviews/RejectedReviews/RejectedReviews')
);

function App() {
  const userIsLogin = useSelector(selectIsLogin);
  // console.log('userIsLogin :>> ', userIsLogin);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Navigate to="/main" />} />
        <Route path="/main" element={<LazyMainPage />} />

        <Route path="/user" element={<LazyUserDashboardPage />} />

        <Route path="/all/*" element={<AllUsersRoutes />} />

        <Route path="/shop/*" element={<ProductsRoutes />} />

        <Route path="/auth/*" element={<AuthRoutes />} />

        <Route path="/admin/*" element={<AdminRoutes />} />

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

        <Route path="*" element={<LazyNotFoundPage />} />

        {/* <Route path="/admin" element={<AdminPage />}>
          <Route path=":productId" element={<AdminPage />} />
        </Route> */}
        {/* <Route
          path="/admin/moderate-reviews"
          element={<ModerateReviewPage />}
        /> */}
        {/* <Route path="admin/feedbacks" element={<FeedbackPage />} /> */}
        <Route path="/testing" element={<TestingPage />} />

      </Route>
    </Routes>
  );
}

export default App;
