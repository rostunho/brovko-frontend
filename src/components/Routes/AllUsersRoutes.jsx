import Loader from 'components/Loader';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


const LazyAboutPage = lazy(() => import('pages/AboutPage/AboutPage'));
const LazyAdvantagesPage = lazy(() =>
  import('pages/AdvantagesPage/AdvantagesPage')
);
const LazyWhereToBuyPage = lazy(() =>
  import('pages/WhereToBuyPage/WhereToBuyPage')
);
const LazyContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'));

const LazyExchangeAndReturnPage = lazy(() =>
  import('pages/ExchangeAndReturnPage/ExchangeAndReturnPage')
);
const LazyPaymentAndDeliveryPage = lazy(() =>
  import('pages/PaymentAndDelivery/PaymentAndDeliveryPage')
);
const LazyPublicOfferPagePage = lazy(() =>
  import('pages/PublicOfferPage/PublicOfferPage')
);

const LazyPrivacyPolicyPage = lazy(() =>
  import('pages/PrivacyPolicyPage/PrivacyPolicyPage.jsx')
);
const LazyNotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));


export const allUserRoutes = [
  {
    path: '/about',
    Component: LazyAboutPage,
  },
  {
    path: '/advantages',
    Component: LazyAdvantagesPage,
  },
  {
    path: '/where-to-buy',
    Component: LazyWhereToBuyPage,
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
    path: '*',
    Component: LazyNotFoundPage,
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
