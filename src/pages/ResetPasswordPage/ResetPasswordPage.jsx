import ResetPswForm from 'components/AuthSection/ResetPswForm/ResetPswForm';
import Heading from 'shared/components/Heading';
import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
import SEO from 'components/SEO/SEO';
import styles from './ResetPasswordPage.module.scss';

export default function ResetPswPage() {
  return (
    <section className={styles.container}>
      <Heading>Відновлення пароля</Heading>
      <SEO
        title="Мій обліковий запис | Brovko"
        description="Мій обліковий запис | Brovko - магазин корисних смаколиків для песиків"
        url="auth/reset-password/:token"
      />
      <AuthFormWrapper form={<ResetPswForm />} />
    </section>
  );
}
