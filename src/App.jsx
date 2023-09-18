import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { lazy } from 'react';
import './App.css';

import SharedLayout from 'components/SharedLayout/SharedLayout';
import AllUsersRoutes from 'components/Routes/AllUsersRoutes';
import ProductsRoutes from 'components/Routes/ProductsRoutes';
import AuthRoutes from 'components/Routes/AuthRoutes';
import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
import LoginForm from 'components/AuthSection/LoginForm/LoginForm';
import OrderForm from 'components/OrderForm/OrderForm';
const LazyMainPage = lazy(() => import('pages/MainPage/MainPage'));
const LazyNotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

const OrderPage = lazy(() => import('pages/OrderPage'));

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<SharedLayout />}>
        <Route path="/main" element={<LazyMainPage />} />
        
        <Route path="/all/*" element={<AllUsersRoutes />} />
        
        <Route path="/products/*" element={<ProductsRoutes />} />
        
          <Route path="/auth/*" element={<AuthRoutes />} />

          <Route path="/order" element={<OrderPage />}>
            <Route index element={<Navigate to="/order/login" />} />
            <Route
              path="login"
              index
              element={<AuthFormWrapper form={<LoginForm />} />}
            />
            <Route path="order-form" element={<OrderForm />} />
          </Route>
          {/* Not Found */}
          <Route path="*" element={<LazyNotFoundPage />} />
        </Route>
      </Routes>
   
  );
}

export default App;
