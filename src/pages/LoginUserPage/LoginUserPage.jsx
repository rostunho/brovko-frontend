import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { selectIsLogin } from 'redux/user/userSelectors';
import LoginForm from 'components/AuthSection/LoginForm/LoginForm';
import Heading from 'shared/components/Heading/Heading';
import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
import AuthSwitcher from 'components/AuthSection/AuthSwitcher/AuthSwitcher';
import SEO from 'components/SEO/SEO';
import styles from './LoginUserPage.module.scss';

import { memoizedSelectLoginAndToken } from 'redux/user/userSelectors';

export default function LoginUserPage() {
  const isUserLogin = useSelector(selectIsLogin);
  // delete
  // const { token, user } = useSelector(memoizedSelectLoginAndToken);
  // console.log('token', token);

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  if (isUserLogin) {
    return <Navigate to="/shop/product-list-page" />;
  }
  return (
    <section className={styles.container}>
      <Heading withGoBack fromHC={backLinkHref}>
        Вхід
      </Heading>
      <SEO
        title="Увійти | Мій обліковий запис | Brovko"
        description="Мій обліковий запис | Brovko - магазин корисних смаколиків для песиків"
        url="/auth/login"
      />

      <AuthFormWrapper form={<LoginForm />} />

      <AuthSwitcher to="/auth/register" linkLabel="Зареєструватися">
        Немає акаунту?
      </AuthSwitcher>
    </section>
  );
}
