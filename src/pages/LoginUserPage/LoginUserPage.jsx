import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLogin } from 'redux/user/userSelectors';
import LoginForm from 'components/AuthSection/LoginForm/LoginForm';
import Heading from 'shared/components/Heading/Heading';
import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
import AuthSwitcher from 'components/AuthSection/AuthSwitcher/AuthSwitcher';
import styles from './LoginUserPage.module.scss';

export default function LoginUserPage() {
  const isUserLogin = useSelector(selectIsLogin);

  if (isUserLogin) {
    return <Navigate to="/product-list-page" />;
  }
  return (
    <section className={styles.container}>
      <Heading withGoBack>Вхід</Heading>

      <AuthFormWrapper form={<LoginForm />} />

      <AuthSwitcher to="/register" linkLabel="Зареєструватися">
        Вже є акаунт ?
      </AuthSwitcher>
    </section>
  );
}
