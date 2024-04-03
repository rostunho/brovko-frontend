import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from 'components/Loader';

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

export default function ProductsRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="product-list-page" element={<LazyProductListPage />} />
        <Route path="favourites" element={<LazyProductFavouritePage />} />
        <Route path="product/:productId" element={<NewProductDetailPage />} />
        <Route
          path="product/:productId/old"
          element={<LazyProductDetailPage />}
        />
      </Routes>
    </Suspense>
  );
}
