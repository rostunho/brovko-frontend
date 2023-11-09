import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLogin } from 'redux/user/userSelectors';
import LoginForm from 'components/AuthSection/LoginForm/LoginForm';
import Heading from 'shared/components/Heading/Heading';
import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
import AuthSwitcher from 'components/AuthSection/AuthSwitcher/AuthSwitcher';
import styles from './LoginUserPage.module.scss';

import { memoizedSelectLoginAndToken } from 'redux/user/userSelectors';

export default function LoginUserPage() {
  const isUserLogin = useSelector(selectIsLogin);
  // delete
  const { token, user } = useSelector(memoizedSelectLoginAndToken);
  // console.log('token', token);

  if (isUserLogin) {
    return <Navigate to="/shop/product-list-page" />;
  }
  return (
    <section className={styles.container}>
      <Heading withGoBack>Вхід</Heading>

      <AuthFormWrapper form={<LoginForm />} />

      <AuthSwitcher to="/auth/register" linkLabel="Зареєструватися">
        Немає акаунту?
      </AuthSwitcher>
    </section>
  );
}
