import Loader from 'components/Loader';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LazyPrivacyPolicyPage } from 'routes';

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
const LazyPaymentAndDeliveryPage = lazy(()=> import('pages/PaymentAndDelivery/PaymentAndDeliveryPage'));
const LazyPublicOfferPagePage = lazy(() =>
  import('pages/PublicOfferPage/PublicOfferPage')
);
const LazyUserAgreementPage = lazy(() =>
  import('pages/UserAgreementPage/UserAgreementPage')
);
const SuperadminPage = lazy(() =>
  import('pages/SuperadminPage/SuperadminPage')
);
const LazyPersonalDataProtectionPage = lazy(() =>
  import('pages/PersonalDataProtectionPage/PersonalDataProtectionPage')
);

export const allUserRoutes = [
  {
    path: '/superadmin',
    Component: SuperadminPage,
  },
  {
    path: '/start',
    Component: LazyStartPage,
  },
  {
    path: '/about',
    Component: LazyAboutPage,
  },
  {
    path: '/perevagy',
    Component: LazyAdvantagesPage,
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
    path: '/payment-and-delivery',
    Component: LazyPaymentAndDeliveryPage,
  },
  {
    path: '/privacy-policy',
    Component: LazyPrivacyPolicyPage,
  },
  {
    path: '/public-offer',
    Component: LazyPublicOfferPagePage,
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
