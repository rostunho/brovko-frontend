import ForgotPswForm from 'components/AuthSection/ForgotPswForm/ForgotPswForm';
import Heading from 'shared/components/Heading';
import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
import styles from './ForgotPasswordPage.module.scss';

export default function ForgotPasswordPage() {
  return (
    <section className={styles.container}>
      <Heading>Забули пароль?</Heading>

      <AuthFormWrapper form={<ForgotPswForm />} />
    </section>
  );
}
