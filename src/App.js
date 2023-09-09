import { Routes, Route, Navigate, Outlet } from 'react-router';
import { Suspense } from 'react';

import SharedLayout from 'components/SharedLayout/SharedLayout';

import { authRoutes, publicRoutes } from './routes';

import './App.css';
import ProductDescription from 'pages/ProductDetailPage/ProductDescription';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* Public Routes */}
        <Route path="" element={<Navigate to="/main" replace />} />

        {publicRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Component />
              </Suspense>
            }
          />
        ))}

        {/* Auth Routes */}
        {authRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Component />
              </Suspense>
            }
          />
        ))}

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>

      {/* Вкладений маршрут для відображення деталей товару */}
      <Route path="/product/:productId" element={<Outlet />}>
        <Route path="description" element={<ProductDescription />} />
      </Route>
    </Routes>
  );
}

export default App;
