import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from 'redux/user/userOperations';
import { selectIsLogin } from 'redux/user/userSelectors';
import LoginForm from 'components/AuthSection/LoginForm/LoginForm';
import Heading from 'shared/components/Heading/Heading';
import Text from 'shared/components/Text/Text';
import AuthSwitcher from 'components/AuthSection/AuthSwitcher/AuthSwitcher';
import GoogleAuth from 'components/AuthSection/GoogleAuth/GoogleAuth';
import styles from './LoginUserPage.module.scss';

export default function LoginUserPage() {
  const isUserLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch();
  const handleLogin = data => {
    dispatch(login(data));
  };
  if (isUserLogin) {
    return <Navigate to="/user-dashboard" />;
  }
  return (
    <section className={styles.container}>
      <Heading withGoBack>Вхід</Heading>

      <LoginForm onSubmit={handleLogin} />

      <Text type="centered">або</Text>

      <GoogleAuth />

      <AuthSwitcher to="/register" linkLabel="Зареєструватися">
        Вже є акаунт ?
      </AuthSwitcher>
    </section>
  );
}
