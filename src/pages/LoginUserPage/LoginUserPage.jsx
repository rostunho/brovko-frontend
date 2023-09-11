import { NavLink } from 'react-router-dom';
import styles from './LoginUserPage.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from 'redux/user/userOperations';
import { selectIsLogin } from 'redux/user/userSelectors';
import LoginForm from 'components/AuthForm/LoginForm/LoginForm';
import Heading from 'shared/components/Heading/Heading';
import GoogleIcon from 'shared/icons/GoogleIcon';

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
    <>
      <div className={styles.container}>
        <Heading withGoBack>Вхід</Heading>

        <LoginForm onSubmit={handleLogin} />
        <div className={styles.redirContainer}>
          <p className={styles.text}>або</p>
          <a
            href="https://brovko-backend.onrender.com/api/user/google"
            className={styles.navLink}
          >
            <GoogleIcon className={styles.googleIcon} />
            Увійти з Google
          </a>

          <p className={styles.redirectText}>
            Немає аккаунту?{' '}
            <NavLink to="/register" className={styles.regLink}>
              Зареєструватися
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
