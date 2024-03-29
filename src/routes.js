// import { lazy } from 'react';

// import ProductDescriptionPage from 'pages/ProductDetailPage/ProductDescriptionPage';

// const LazyAboutPage = lazy(() => import('pages/AboutPage/AboutPage'));
// const LazyAdminPage = lazy(() => import('pages/AdminPage/AdminPage'));

// const LazyStartPage = lazy(() => import('pages/StartPage/StartPage'));
// const LazyMainPage = lazy(() => import('pages/MainPage/MainPage'));

// const LazyPerevagyPage = lazy(() =>
//   import('pages/AdvantagesPage/AdvantagesPage')
// );

// const LazyWereToBuyPage = lazy(() =>
//   import('pages/WereToBuyPage/WereToBuyPage')
// );

// const LazyUserDashboardPage = lazy(() =>
//   import('pages/UserDashboardPage/UserDashboardPage')
// );

// const LazyContactsPage = lazy(() => import('pages/ContactsPage/ContactsPage'));

// const LazyProductListPage = lazy(() =>
//   import('pages/ProductListPage/ProductListPage')
// );

// export const LazyProductDetailPage = lazy(() =>
//   import('pages/ProductDetailPage/ProductDetailPage.jsx')
// );

// export const LazyProductDescription = lazy(() =>
//   import('pages/ProductDetailPage/ProductDescriptionPage')
// );

// const LazyExchangeAndReturnPage = lazy(() =>
//   import('pages/ExchangeAndReturnPage/ExchangeAndReturnPage')
// );

// export const LazyPrivacyPolicyPage = lazy(() => import('pages/PrivacyPolicyPage/PrivacyPolicyPage.jsx'))

// export const LazyPublicOfferPage = lazy(() => import('pages/PublicOfferPage/PublicOfferPage'))

// export const LazyNotFoundPage = lazy(() =>
//   import('pages/NotFoundPage/NotFoundPage')
// );

// export const adminRoutes = [
//   {
//     path: '/admin',
//     Component: LazyAdminPage,
//   },
// ];

// export const privatRoutes = [
//   {
//     path: '/user-dashboard',
//     Component: LazyUserDashboardPage,
//   },
// ];

// export const userRoutes = [
//   {
//     path: '/',
//     Component: LazyMainPage,
//   },

//   {
//     path: '/main',
//     Component: LazyMainPage,
//   },

//   {
//     path: '*',
//     Component: LazyNotFoundPage,
//   },

//   {
//     path: '/privacy-policy',
//     Component: LazyPrivacyPolicyPage,
//   },

//   {
//     path: '/privacy-policy',
//     Component: LazyPublicOfferPage,
//   },

//   {
//     path: '/perevagy',
//     Component: LazyPerevagyPage,
//   },
//   {
//     path: '/start',
//     Component: LazyStartPage,
//   },

//   {
//     path: '/product-list-page',
//     Component: LazyProductListPage,
//   },

//   {
//     path: '/product/:productId',
//     Component: LazyProductDetailPage,
//     children: [
//       {
//         path: 'description',
//         element: <ProductDescriptionPage />,
//       },
//     ],
//   },
//   {
//     path: '/about',
//     Component: LazyAboutPage,
//   },
//   {
//     path: '/where-to-buy',
//     Component: LazyWereToBuyPage,
//   },
//   {
//     path: '/contacts',
//     Component: LazyContactsPage,
//   },
//   {
//     path: '/exchange-and-return',
//     Component: LazyExchangeAndReturnPage,
//   },
// ];
