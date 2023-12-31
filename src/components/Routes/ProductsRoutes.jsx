import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
import LoginForm from 'components/AuthSection/LoginForm/LoginForm';

import OrderForm from 'components/OrderForm/OrderForm';
import Loader from 'components/Loader';

const LazyUserDashboardPage = lazy(() =>
  import('pages/UserDashboardPage/UserDashboardPage')
);

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

const OrderPage = lazy(() => import('pages/OrderPage'));

export default function ProductsRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="product-list-page" element={<LazyProductListPage />} />
        <Route path="user" element={<LazyUserDashboardPage />} />
        <Route path="product/:productId" element={<LazyProductDetailPage />}>
          <Route path="description" element={<LazyProductDescription />} />
          <Route path="review" element={<LazyProductReviewPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
