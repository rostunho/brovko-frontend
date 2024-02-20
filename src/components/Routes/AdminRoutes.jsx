import Loader from 'components/Loader';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const SuperadminPage = lazy(() =>
  import('pages/SuperadminPage/SuperadminPage')
);

const AdminPage = lazy(() => import('pages/AdminPage'));

const ModerateReviewPage = lazy(() =>
  import('pages/ModerateReviewPage/ModerateReviewPage')
);
const FeedbackPage = lazy(() => import('pages/FeedbackPage/FeedbackPage'));



export const adminRoutes = [
    {
      path: '/superadmin',
      Component: SuperadminPage,
    },
    {
      path: '/admin',
      Component: AdminPage,
    },
    {
      path: '/admin/moderate-reviews',
      Component: ModerateReviewPage,
    },
    {
      path: '/admin/feedbacks',
      Component: FeedbackPage,
    },
]


export default function AdminRoutes() {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
        <Route path='/superadmin' element={<SuperadminPage/>}></Route> 
        <Route path="/admin" element={<AdminPage />}>
          <Route path=":productId" element={<AdminPage />} />
        </Route>
        <Route
          path="/admin/moderate-reviews"
          element={<ModerateReviewPage />}
          />
          <Route path="admin/feedbacks" element={<FeedbackPage />} />
        </Routes>
      </Suspense>
      )
}