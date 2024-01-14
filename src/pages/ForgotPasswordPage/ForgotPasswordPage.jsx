import ForgotPswForm from 'components/AuthSection/ForgotPswForm/ForgotPswForm';
import Heading from 'shared/components/Heading';
import AuthFormWrapper from 'components/AuthSection/AuthFormWrapper/AuthFormWrapper';
import Text from 'shared/components/Text/Text';
import styles from './ForgotPasswordPage.module.scss';

export default function ForgotPasswordPage() {
  return (
    <section className={styles.container}>
      <Heading>Забули пароль?</Heading>
      <Text className={styles.text}>
        Будь ласка, введіть вашу e-mail адресу. Ви отримаєте електронний лист з
        посиланням для створення нового паролю.
      </Text>
      <AuthFormWrapper form={<ForgotPswForm />} />
    </section>
  );
}
