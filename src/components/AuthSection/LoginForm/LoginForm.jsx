import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { login } from 'redux/user/userOperations';

import { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import Input from 'shared/components/Input';
import Button from 'shared/components/Button/Button';
import useForm from 'shared/hooks/useForm';
import initialState from './initialState';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit: dispatchUser,
  });
  const { email, password } = state;
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  useEffect(() => {
    isValidEmail === 'isValid' && isValidPassword === 'isValid'
      ? setShowSubmitButton(true)
      : setShowSubmitButton(false);
  }, [isValidEmail, isValidPassword]);

  function dispatchUser(data) {
    dispatch(login(data));
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="E-mail"
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
      <NavLink to="/auth/forgot-password">Забули пароль</NavLink>

      <Button
        type="submit"
        className={styles['submit-button']}
        size="lg"
        disabled={!showSubmitButton}
      >
        Увійти
      </Button>
    </form>
  );
};

// LoginForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default LoginForm;
