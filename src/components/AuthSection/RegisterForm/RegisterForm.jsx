import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/user/userOperations';
// import PropTypes from 'prop-types';
// import OldInput from 'shared/components/OldInput/OldInput';
import Input from 'shared/components/Input';
import Button from 'shared/components/Button/Button';
import useForm from 'shared/hooks/useForm';
import initialState from './initialState';
import UserConsent from './UserConsent';
import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit: dispatchUser,
  });
  const { email, password } = state;
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    password === confirmPassword
      ? setPasswordChecked(true)
      : setPasswordChecked(false);
  }, [confirmPassword, password]);

  useEffect(() => {
    isValidEmail === 'isValid' &&
    isValidPassword === 'isValid' &&
    passwordChecked
      ? setShowSubmitButton(true)
      : setShowSubmitButton(false);
  }, [isValidEmail, isValidPassword, passwordChecked]);

  function dispatchUser(data) {
    dispatch(register(data));
  }

  return (
    <form
      ref={formRef}
      onSubmit={e => {
        handleSubmit(e);
        setConfirmPassword('');
      }}
      className={styles.form}
    >
      <Input
        label="E-mail"
        // style={{ backgroundColor: '#801f1f' }}
        type="email"
        name="email"
        placeholder="Введіть свій e-mail"
        required={true}
        value={email}
        validateStatus={setIsValidEmail}
        onChange={handleChange}
      />
      <Input
        label="Пароль"
        type="password"
        name="password"
        placeholder="Введіть пароль"
        required={true}
        value={password}
        validateStatus={setIsValidPassword}
        onChange={handleChange}
      />
      <Input
        label="Підтвердження паролю"
        type="password"
        name="confirmPassword"
        placeholder="Підтвердіть пароль"
        required={true}
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <UserConsent />
      <Button
        type="submit"
        className={styles['submit-button']}
        size="lg"
        disabled={!showSubmitButton}
      >
        Зареєструватися
      </Button>
    </form>
  );
};

// RegisterForm.propTyprs = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default RegisterForm;
