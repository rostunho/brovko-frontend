import Loader from 'components/Loader';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const LazyRegisterUserPage = lazy(() =>
  import('pages/RegisterUserPage/RegisterUserPage')
);

const LazyLoginUserPage = lazy(() =>
  import('pages/LoginUserPage/LoginUserPage')
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
