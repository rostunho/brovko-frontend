import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const LazyRegisterUserPage = lazy(() =>
  import('pages/RegisterUserPage/RegisterUserPage')
);

const LazyLoginUserPage = lazy(() =>
  import('pages/LoginUserPage/LoginUserPage')
);

export const authRoutes = [
  {
    path: '/register',
    Component: LazyRegisterUserPage,
  },
  {
    path: '/login',
    Component: LazyLoginUserPage,
  },
];

export default function AuthRoutes() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
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
