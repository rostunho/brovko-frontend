import AboutPage from 'pages/AboutPage/AboutPage';
import AdminPage from 'pages/AdminPage';
import TempPreview from 'components/Preview/TempPreview';
import MainPage from 'pages/MainPage/MainPage';
import RegisterUserPage from 'pages/RegisterUserPage/RegisterUserPage';
import LoginUserPage from 'pages/LoginUserPage/LoginUserPage';
import UserDashboardPage from 'pages/UserDashboardPage/UserDashboardPage';
import ProductListPage from 'pages/ProductListPage/ProductListPage';

export const authRoutes = [
  {
    path: '/admin',
    Component: AdminPage,
  },
  {
    path: '/register',
    Component: RegisterUserPage,
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
  //   {
  //     path: '/',
  //     Component: TempPreview,
  //   },
  {
    path: '/main',
    Component: TempPreview,
  },
  {
    path: '/about',
    Component: AboutPage,
  },
  {
    path: '/product-list-page',
    Component: ProductListPage,
  },
];
