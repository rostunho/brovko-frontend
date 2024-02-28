import Loader from 'components/Loader';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const AllAdminsPage = lazy(() => import('pages/AllAdminsPage/AllAdminsPage'));

const AdminPage = lazy(() => import('pages/Admin/AdminPage'));

const SuperadminPage = lazy(() =>
  import('pages/SuperadminPage/SuperadminPage')
);
const ModerateReviewPage = lazy(() =>
  import('pages/Admin/ModerateReviewPage/ModerateReviewPage')
);
const FeedbackPage = lazy(() => import('pages/FeedbackPage/FeedbackPage'));
const AdminLocationsPage = lazy(() =>
  import('pages/Admin/AdminLocationsPage/AdminLocationsPage')
);
const ProductListPage = lazy(() =>
  import('pages/ProductListPage/ProductListPage')
);

export default function AdminRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AllAdminsPage />} />
        <Route path="/add-product" element={<AdminPage />}>
          <Route path=":productId" element={<AdminPage />} />
        </Route>
        <Route path="/update-product" element={<ProductListPage />} />
        <Route path="/moderate-reviews" element={<ModerateReviewPage />} />

        <Route path="/superadmin" element={<SuperadminPage />} />
        <Route path="/feedbacks" element={<FeedbackPage />} />
        <Route path="/add-location" element={<AdminLocationsPage />}>
          <Route path=":locationId" element={<AdminLocationsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
