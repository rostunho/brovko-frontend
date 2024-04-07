import Text from 'shared/components/Text/Text';
import GoogleAuth from 'components/AuthSection/GoogleAuth/GoogleAuth';
import AuthSwitcher from '../AuthSwitcher';
import styles from './AuthFormWrapper.module.scss';

export default function AuthFormWrapper({ form }) {
  return (
    <div className={styles.container}>
      {form}

      <Text type="divider">або</Text>

      <GoogleAuth />

      <AuthSwitcher to="/auth/register" linkLabel="Зареєструватися">
        Немає акаунту?
      </AuthSwitcher>
    </div>
  );
}
