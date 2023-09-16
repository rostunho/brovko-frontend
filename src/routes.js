import { lazy } from 'react';

import ProductDescriptionPage from 'pages/ProductDetailPage/ProductDescription';

const LazyAboutPage = lazy(() => import('pages/AboutPage/AboutPage'));
const LazyAdminPage = lazy(() => import('pages/AdminPage/AdminPage'));

const LazyStartPage = lazy(() => import('pages/StartPage/StartPage'));
const LazyMainPage = lazy(() => import('pages/MainPage/MainPage'));

const LazyPerevagyPage = lazy(() => import('pages/PerevagyPage/PerevagyPage'));

const LazyWereToBuyPage = lazy(() =>
  import('pages/WereToBuyPage/WereToBuyPage')
);

const LazyRegisterUserPage = lazy(() =>
  import('pages/RegisterUserPage/RegisterUserPage')
);

const LazyLoginUserPage = lazy(() =>
  import('pages/LoginUserPage/LoginUserPage')
);

const LazyUserDashboardPage = lazy(() =>
  import('pages/UserDashboardPage/UserDashboardPage')
);

const LazyContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'));

const LazyProductListPage = lazy(() =>
  import('pages/ProductListPage/ProductListPage')
);

export const LazyProductDetailPage = lazy(() =>
  import('pages/ProductDetailPage/ProductDetailPage.jsx')
);

export const LazyProductDescription = lazy(() =>
  import('pages/ProductDetailPage/ProductDescription')
);

const LazyExchangeAndReturnPage = lazy(() =>
  import('pages/ExchangeAndReturnPage/ExchangeAndReturnPage')
);

export const LazyNotFoundPage = lazy(() =>
  import('pages/NotFoundPage/NotFoundPage')
);

export const authRoutes = [
  {
    path: '/admin',
    Component: LazyAdminPage,
  },

  {
    path: '/login',
    Component: LazyLoginUserPage,
  },
  {
    path: '/user-dashboard',
    Component: LazyUserDashboardPage,
  },
];

export const publicRoutes = [
  {
    path: '/',
    Component: LazyMainPage,
  },

  {
    path: '/main',
    Component: LazyMainPage,
  },
  {
    path: '*',
    Component: LazyNotFoundPage,
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
    path: '/register',
    Component: LazyRegisterUserPage,
  },
  {
    path: '/product-list-page',
    Component: LazyProductListPage,
  },

  {
    path: '/product/:productId',
    Component: LazyProductDetailPage,
    children: [
      {
        path: 'description',
        element: <ProductDescriptionPage />,
      },
    ],
  },
  {
    path: '/about',
    Component: LazyAboutPage,
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
