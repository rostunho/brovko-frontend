import AboutPage from 'pages/AboutPage/AboutPage';
import AdminPage from 'pages/AdminPage';
import TempPreview from 'components/Preview/TempPreview';
import StartPage from 'pages/StartPage/StartPage';
import MainPage from 'pages/MainPage/MainPage';
import WereToBuyPage from 'pages/WereToBuyPage/WereToBuyPage';
import RegisterUserPage from 'pages/RegisterUserPage/RegisterUserPage';
import LoginUserPage from 'pages/LoginUserPage/LoginUserPage';
import UserDashboardPage from 'pages/UserDashboardPage/UserDashboardPage';
import ContactsPage from 'pages/ContactsPage/ContactsPage';
import ProductListPage from 'pages/ProductListPage/ProductListPage';

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
    path: '/were-to-buy',
    Component: WereToBuyPage,
  },
  {
    path: '/contacts',
    Component: ContactsPage,
  },
];
