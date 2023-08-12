import { Routes, Route, Navigate } from 'react-router';
import { authRoutes, publicRoutes } from './routes';

import './App.css';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      {/* Auth Routes */}
      {authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      {/* Redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
