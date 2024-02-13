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
const LazyProductFavouritePage = lazy(() =>
  import('pages/ProductsFavouritePage/ProductsFavouritePage')
);
const LazyProductDetailPage = lazy(() =>
  import('pages/ProductDetailPage/ProductDetailPage.jsx')
);

const NewProductDetailPage = lazy(() =>
  import('pages/NewProductDetailPage/NewProductDetailPage')
);

const LazyProductDescriptionPage = lazy(() =>
  import('pages/ProductDetailPage/ProductDescriptionPage')
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
        <Route path="favourites" element={<LazyProductFavouritePage />} />
        <Route path="user" element={<LazyUserDashboardPage />} />
        <Route path="product/:productId" element={<NewProductDetailPage />} />
        <Route
          path="product/:productId/old"
          element={<LazyProductDetailPage />}
        />

        {/* <Route path="product/:productId" element={<LazyProductDetailPage />}>
          <Route path="description" element={<LazyProductDescriptionPage />} />
          <Route path="review" element={<LazyProductReviewPage />} />
        </Route> */}
      </Routes>
    </Suspense>
  );
}
