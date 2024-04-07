// ВИДАЛИТИ КОМПОНЕНТ ПІСЛЯ ТОГО, ЯК ПРИБЕРЕМО ДЕМО-ЛОГІНІЗАЦІЮ

import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Loader from 'components/Loader';
import LoginForm from 'components/AuthSection/LoginForm';
import styles from './LoginDemoPage.module.scss';

export default function LoginDemoPage({ ...props }) {
  return (
    <Suspense fallback={<Loader />}>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </Suspense>
  );
}
