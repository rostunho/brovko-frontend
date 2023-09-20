import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const LazyAboutPage = lazy(() => import('pages/AboutPage/AboutPage'));
const LazyStartPage = lazy(() => import('pages/StartPage/StartPage'));
const LazyPerevagyPage = lazy(() => import('pages/PerevagyPage/PerevagyPage'));
const LazyWereToBuyPage = lazy(() => import('pages/WereToBuyPage/WereToBuyPage'));
const LazyContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'));
const LazyExchangeAndReturnPage = lazy(() =>
  import('pages/ExchangeAndReturnPage/ExchangeAndReturnPage')
);

export const allUserRoutes = [
  {
    path: '/about',
    Component: LazyAboutPage,
  },
  {
    path: '/perevagy',
    Component: LazyPerevagyPage,
  },
  {
    path: '/start',
    Component: LazyStartPage,
  },

  {
    path: '/where-to-buy',
    Component: LazyWereToBuyPage,
  },
  {
    path: '/contacts',
    Component: LazyContactsPage,
  },
  {
    path: '/exchange-and-return',
    Component: LazyExchangeAndReturnPage,
  },
];

export default function AllUsersRoutes() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <>
          {allUserRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </>
      </Routes>
    </Suspense>
  );
}
