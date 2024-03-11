import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { selectIsLogin } from 'redux/user/userSelectors';
import RegisterForm from 'components/AuthSection/RegisterForm/RegisterForm';
import Heading from 'shared/components/Heading/Heading';
import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
// import Text from 'shared/components/Text/Text';
import AuthSwitcher from 'components/AuthSection/AuthSwitcher/AuthSwitcher';
import SEO from 'components/SEO/SEO';
import styles from './RegisterUserPage.module.scss';

export default function RegisterUserPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  const isUserLogin = useSelector(selectIsLogin);

  if (isUserLogin) {
    return <Navigate to="/shop/product-list-page" />;
  }
  return (
    <section className={styles.container}>
      <Heading withGoBack fromHC={backLinkHref}>
        Реєстрація
      </Heading>
      <SEO
        title="Зареєструватися | Мій обліковий запис | Brovko"
        description="Мій обліковий запис | Brovko - магазин корисних смаколиків для песиків"
        url="auth/register"
      />

      <AuthFormWrapper form={<RegisterForm />} />

      <AuthSwitcher to="/auth/login" linkLabel="Увійти">
        Вже є акаунт?
      </AuthSwitcher>
    </section>
  );
}
