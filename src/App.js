import { Routes, Route, Navigate } from 'react-router';

import SharedLayout from 'components/SharedLayout/SharedLayout';
import { authRoutes, publicRoutes } from './routes';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* Public Routes */}
        <Route path="" element={<Navigate to="/main" replace />} />

        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {/* Auth Routes */}
        {authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
