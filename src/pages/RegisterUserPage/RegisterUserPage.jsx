import styles from './RegisterUserPage.module.scss';
import { useDispatch } from 'react-redux';
import { register } from 'redux/user/userOperations';
import RegisterForm from 'components/AuthForm/RegisterForm/RegisterForm';
import Heading from 'shared/components/Heading/Heading';

export default function RegisterUserPage() {
  // const dispatch = useDispatch();
  // const handleRegister = data => {
  //   dispatch(register(data));
  // };
  return (
    <>
      <Heading>Реєстрація</Heading>
      {/* <RegisterForm onSubmit={handleRegister} /> */}
    </>
  );
}
