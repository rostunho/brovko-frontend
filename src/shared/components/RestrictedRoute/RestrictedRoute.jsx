import { Navigate, Route } from 'react-router-dom';

export default function RestrictedRoute({ element: Element, pass, ...props }) {
  return (
    <Route {...props} element={pass ? <Element /> : <Navigate to="/" />} />
  );
}
