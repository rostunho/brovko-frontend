import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { lazy } from 'react';

import SharedLayout from 'components/SharedLayout/SharedLayout';
import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
import LoginForm from 'components/AuthSection/LoginForm/LoginForm';
import OrderForm from 'components/OrderForm/OrderForm';
import { authRoutes, publicRoutes } from './routes';
import './App.css';

const LazyAdminPage = lazy(() => import('pages/AdminPage/AdminPage'));
const LazyLoginUserPage = lazy(() =>
  import('pages/LoginUserPage/LoginUserPage')
);
const LazyUserDashboardPage = lazy(() =>
  import('pages/UserDashboardPage/UserDashboardPage')
);

const LazyAboutPage = lazy(() => import('pages/AboutPage/AboutPage'));
const LazyStartPage = lazy(() => import('pages/StartPage/StartPage'));
const LazyMainPage = lazy(() => import('pages/MainPage/MainPage'));
const LazyPerevagyPage = lazy(() => import('pages/PerevagyPage/PerevagyPage'));
const LazyWereToBuyPage = lazy(() =>
  import('pages/WereToBuyPage/WereToBuyPage')
);
const LazyRegisterUserPage = lazy(() =>
  import('pages/RegisterUserPage/RegisterUserPage')
);
const LazyContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'));
const LazyProductListPage = lazy(() =>
  import('pages/ProductListPage/ProductListPage')
);
const LazyProductDetailPage = lazy(() =>
  import('pages/ProductDetailPage/ProductDetailPage.jsx')
);
const LazyProductDescription = lazy(() =>
  import('pages/ProductDetailPage/ProductDescription')
);
const LazyProductReviewPage = lazy(() =>
  import('pages/ProductDetailPage/ProductReviewPage')
);
const LazyExchangeAndReturnPage = lazy(() =>
  import('pages/ExchangeAndReturnPage/ExchangeAndReturnPage')
);
const LazyNotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

const OrderPage = lazy(() => import('pages/OrderPage'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* Default Redirect */}
        <Route path="" element={<Navigate to="/main" replace />} />

        {/* Public Routes */}
        <Route path="main" element={<LazyMainPage />} />
        <Route path="perevagy" element={<LazyPerevagyPage />} />
        <Route path="start" element={<LazyStartPage />} />
        <Route path="register" element={<LazyRegisterUserPage />} />
        <Route path="product-list-page" element={<LazyProductListPage />} />

        <Route path="product/:productId" element={<LazyProductDetailPage />}>
          <Route path="description" element={<LazyProductDescription />} />
          <Route path="review" element={<LazyProductReviewPage />} />
        </Route>

        <Route path="/order" element={<OrderPage />}>
          <Route index element={<Navigate to="/order/login" />} />
          <Route
            path="login"
            index
            element={<AuthFormWrapper form={<LoginForm />} />}
          />
          <Route path="order-form" element={<OrderForm />} />
        </Route>

        <Route path="about" element={<LazyAboutPage />} />
        <Route path="where-to-buy" element={<LazyWereToBuyPage />} />
        <Route path="contacts" element={<LazyContactsPage />} />
        <Route
          path="exchange-and-return"
          element={<LazyExchangeAndReturnPage />}
        />

        {/* Auth Routes */}
        {authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {/* Not Found */}
        <Route path="*" element={<LazyNotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
