import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { login } from 'redux/user/userOperations';
import { errorAuth } from 'redux/user/userSelectors';
import { resetError } from 'redux/user/userSlice';
import { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import Input from 'shared/components/Input';
import Text from 'shared/components/Text/Text';
import Button from 'shared/components/Button/Button';
import useForm from 'shared/hooks/useForm';
import initialState from './initialState';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { state, setState, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit: dispatchUser,
  });
  const { email, password } = state;
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const errorLogin = useSelector(errorAuth);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    isValidEmail === 'isValid' && isValidPassword === 'isValid'
      ? setShowSubmitButton(true)
      : setShowSubmitButton(false);
  }, [isValidEmail, isValidPassword]);

  useEffect(() => {
    if (errorLogin) {
      setFormError(errorLogin);
    }
  }, [errorLogin]);

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  function dispatchUser(data) {
    dispatch(login(data))
      .then(() => {
        setState({ ...data });
      })
      .catch(error => {
        setFormError(error.message);
      });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      {formError && <Text className={styles.textError}>{formError}</Text>}
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
