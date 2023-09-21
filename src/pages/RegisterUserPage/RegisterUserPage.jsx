import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLogin } from 'redux/user/userSelectors';
import RegisterForm from 'components/AuthSection/RegisterForm/RegisterForm';
import Heading from 'shared/components/Heading/Heading';
import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
import Text from 'shared/components/Text/Text';
import AuthSwitcher from 'components/AuthSection/AuthSwitcher/AuthSwitcher';
import styles from './RegisterUserPage.module.scss';

export default function RegisterUserPage() {
  const isUserLogin = useSelector(selectIsLogin);

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

      <AuthFormWrapper form={<RegisterForm />} />

      <AuthSwitcher to="/login" linkLabel="Увійти">
        Вже є акаунт ?
      </AuthSwitcher>
    </section>
  );
}
