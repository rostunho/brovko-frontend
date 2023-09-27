import Text from 'shared/components/Text/Text';
import GoogleAuth from 'components/AuthSection/GoogleAuth/GoogleAuth';

export default function AuthFormWrapper({ form }) {
  return (
    <>
      {form}
      {/* <RegisterForm /> */}

      <Text type="divider">або </Text>

      <GoogleAuth />
    </>
  );
}
