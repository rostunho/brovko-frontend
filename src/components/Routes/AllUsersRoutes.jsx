import Loader from 'components/Loader';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const LazyAboutPage = lazy(() => import('pages/AboutPage/AboutPage'));
const LazyStartPage = lazy(() => import('pages/StartPage/StartPage'));
const LazyAdvantagesPage = lazy(() =>
  import('pages/AdvantagesPage/AdvantagesPage')
);
const LazyWereToBuyPage = lazy(() =>
  import('pages/WereToBuyPage/WereToBuyPage')
);
const LazyContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'));
const LazyExchangeAndReturnPage = lazy(() =>
  import('pages/ExchangeAndReturnPage/ExchangeAndReturnPage')
);
const LazyUserAgreementPage = lazy(() =>
  import('pages/UserAgreementPage/UserAgreementPage')
);
const LazyPersonalDataProtectionPage = lazy(() =>
  import('pages/PersonalDataProtectionPage/PersonalDataProtectionPage')
);

export const allUserRoutes = [
  {
    path: '/about',
    Component: LazyAboutPage,
  },
  {
    path: '/perevagy',
    Component: LazyAdvantagesPage,
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
  {
    path: '/user-agreement',
    Component: LazyUserAgreementPage,
  },
  {
    path: '/personal-data-protection',
    Component: LazyPersonalDataProtectionPage,
  },
];

export default function AllUsersRoutes() {
  return (
    <Suspense fallback={<Loader />}>
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
