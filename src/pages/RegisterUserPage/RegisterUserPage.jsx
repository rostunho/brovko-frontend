import { NavLink } from 'react-router-dom';
import styles from './RegisterUserPage.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { register } from 'redux/user/userOperations';
import { selectIsLogin } from 'redux/user/userSelectors';
import RegisterForm from 'components/AuthForm/RegisterForm/RegisterForm';
import Heading from 'shared/components/Heading/Heading';
import GoogleIcon from 'shared/icons/GoogleIcon';

export default function RegisterUserPage() {
  const isUserLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch();
  const handleRegister = data => {
    dispatch(register(data));
  };
  if (isUserLogin) {
    return <Navigate to="/user-dashboard" />;
  }
  return (
    <>
      <div className={styles.container}>
        <Heading withGoBack>Реєстрація</Heading>
        <p className={styles.description}>
          Створення облікового запису допоможе купувати швидше, а також
          переглядати замовлення зроблені раніше.
        </p>
        <RegisterForm onSubmit={handleRegister} />
        <div className={styles.redirContainer}>
          <p className={styles.text}>або</p>
          <a
            href="https://brovko-backend.onrender.com/api/user/google"
            className={styles.navLink}
          >
            <GoogleIcon className={styles.googleIcon} />
            Продовжити з Google
          </a>

          <p className={styles.redirectText}>
            Вже є аккаунт?{' '}
            <NavLink to="/login" className={styles.logLink}>
              Увійти
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
