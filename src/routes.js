import AboutPage from 'pages/AboutPage/AboutPage';
import AdminPage from 'pages/AdminPage';
import TempPreview from 'components/Preview/TempPreview';
import StartPage from 'pages/StartPage/StartPage';
import MainPage from 'pages/MainPage/MainPage';
import PerevagyPage from 'pages/PerevagyPage/PerevagyPage';
import WereToBuyPage from 'pages/WereToBuyPage/WereToBuyPage';
import RegisterUserPage from 'pages/RegisterUserPage/RegisterUserPage';
import LoginUserPage from 'pages/LoginUserPage/LoginUserPage';
import UserDashboardPage from 'pages/UserDashboardPage/UserDashboardPage';
import ContactsPage from 'pages/ContactsPage/ContactsPage';
import ProductListPage from 'pages/ProductListPage/ProductListPage';
import ExchangeAndReturnPage from 'pages/ExchangeAndReturnPage/ExchangeAndReturnPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

export const authRoutes = [
  {
    path: '/admin',
    Component: AdminPage,
  },

  {
    path: '/login',
    Component: LoginUserPage,
  },
  {
    path: '/user-dashboard',
    Component: UserDashboardPage,
  },
];

export const publicRoutes = [
  {
    path: '/',
    Component: MainPage,
  },
  {
    path: '/main',
    Component: MainPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
  {
    path: '/perevagy',
    Component: PerevagyPage,
  },
  {
    path: '/start',
    Component: StartPage,
  },
  {
    path: '/register',
    Component: RegisterUserPage,
  },
  {
    path: '/product-list-page',
    Component: ProductListPage,
  },
  {
    path: '/about',
    Component: AboutPage,
  },
  {
    path: '/where-to-buy',
    Component: WereToBuyPage,
  },
  {
    path: '/contacts',
    Component: ContactsPage,
  },
  {
    path: '/exchange-and-return',
    Component: ExchangeAndReturnPage,
  },
];
