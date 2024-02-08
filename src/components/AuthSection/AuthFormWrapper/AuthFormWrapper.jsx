import Text from 'shared/components/Text/Text';
import GoogleAuth from 'components/AuthSection/GoogleAuth/GoogleAuth';
import styles from './AuthFormWrapper.module.scss';

export default function AuthFormWrapper({ form }) {
  return (
    <div className={styles.container}>
      {form}
      {/* <RegisterForm /> */}

      <Text type="divider">або</Text>

      <GoogleAuth />
    </div>
  );
}
