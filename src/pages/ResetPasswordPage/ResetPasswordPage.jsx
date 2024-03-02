import ResetPswForm from 'components/AuthSection/ResetPswForm/ResetPswForm';
import Heading from 'shared/components/Heading';
import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
import styles from './ResetPasswordPage.module.scss';

export default function ResetPswPage() {
  return (
    <section className={styles.container}>
      <Heading>Відновлення пароля</Heading>

      <AuthFormWrapper form={<ResetPswForm />} />
    </section>
  );
}
