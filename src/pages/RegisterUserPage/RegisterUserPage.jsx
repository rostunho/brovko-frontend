import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { register } from 'redux/user/userOperations';
import { selectIsLogin } from 'redux/user/userSelectors';
import RegisterForm from 'components/AuthSection/RegisterForm/RegisterForm';
import Heading from 'shared/components/Heading/Heading';
import Text from 'shared/components/Text/Text';
import GoogleAuth from 'components/AuthSection/GoogleAuth/GoogleAuth';
import AuthSwitcher from 'components/AuthSection/AuthSwitcher/AuthSwitcher';
import styles from './RegisterUserPage.module.scss';

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
    <section className={styles.container}>
      <Heading withGoBack>Реєстрація</Heading>

      <Text style={{ marginBottom: '24px' }}>
        Створення облікового запису допоможе купувати швидше, а також
        переглядати замовлення зроблені раніше.
      </Text>

      <RegisterForm onSubmit={handleRegister} />

      <Text type="centered">або</Text>

      <GoogleAuth />

      <AuthSwitcher to="/login" linkLabel="Увійти">
        Вже є акаунт ?
      </AuthSwitcher>
    </section>
  );
}
