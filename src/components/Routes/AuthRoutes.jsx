import Loader from 'components/Loader';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const LazyRegisterUserPage = lazy(() =>
  import('pages/RegisterUserPage/RegisterUserPage')
);

const LazyLoginUserPage = lazy(() =>
  import('pages/LoginUserPage/LoginUserPage')
);

const LazyForgotPasswordPage = lazy(() =>
  import('pages/ForgotPasswordPage/ForgotPasswordPage')
);

const LazyResetPasswordPage = lazy(() =>
  import('pages/ResetPasswordPage/ResetPasswordPage')
);

const TempAuthPage = lazy(() => import('pages/TempAuthPage/TempAuthPage'));

export const authRoutes = [
  {
    path: '/register',
    Component: LazyRegisterUserPage,
  },
  {
    path: '/login',
    Component: LazyLoginUserPage,
  },
  {
    path: '/temp',
    Component: TempAuthPage,
  },
  {
    path: '/forgot-password',
    Component: LazyForgotPasswordPage,
  },

  {
    path: '/reset-password/:token',
    Component: LazyResetPasswordPage,
  },
];

export default function AuthRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <>
          {authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </>
      </Routes>
    </Suspense>
  );
}
