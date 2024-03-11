import { useLocation } from 'react-router-dom';
import ForgotPswForm from 'components/AuthSection/ForgotPswForm/ForgotPswForm';
import Heading from 'shared/components/Heading';
import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
import SEO from 'components/SEO/SEO';
import styles from './ForgotPasswordPage.module.scss';

export default function ForgotPasswordPage() {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <section className={styles.container}>
      <Heading withGoBack fromHC={backLinkHref}>
        Забули пароль?
      </Heading>
      <SEO
        title="Мій обліковий запис | Brovko"
        description="Мій обліковий запис | Brovko - магазин корисних смаколиків для песиків"
        url="auth/forgot-password"
      />

      <AuthFormWrapper form={<ForgotPswForm />} />
    </section>
  );
}
