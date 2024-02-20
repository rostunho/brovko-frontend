import Loader from 'components/Loader';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const AllAdminsPage = lazy(() => import('pages/AllAdminsPage/AllAdminsPage'));

const AdminPage = lazy(() => import('pages/AdminPage'));

const SuperadminPage = lazy(() =>
  import('pages/SuperadminPage/SuperadminPage')
);

const ModerateReviewPage = lazy(() =>
  import('pages/ModerateReviewPage/ModerateReviewPage')
);
const FeedbackPage = lazy(() => import('pages/FeedbackPage/FeedbackPage'));



export default function AdminRoutes() {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
        <Route path="/" element={<AllAdminsPage />} />
        <Route path="/addProduct" element={<AdminPage />}>
          <Route path=":productId" element={<AdminPage />} />
        </Route>
        <Route path="/moderate-reviews" element={<ModerateReviewPage />} />    
        <Route path="/superadmin" element={<SuperadminPage />} />
        <Route path="/feedbacks" element={<FeedbackPage />} />
      </Routes>
      </Suspense>
      )
}