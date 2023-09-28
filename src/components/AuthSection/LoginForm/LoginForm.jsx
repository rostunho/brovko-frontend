import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { login } from 'redux/user/userOperations';

import { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import OldInput from 'shared/components/OldInput/OldInput';
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
  const [validationData, setValidationData] = useState(false);
  useEffect(() => {
    const condition = email && password.length > 0;
    condition ? setValidationData(true) : setValidationData(false);
  }, [email, password]);

  function dispatchUser(data) {
    dispatch(login(data));
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      <OldInput
        label="E-mail"
        type="email"
        name="email"
        placeholder="Введіть свій e-mail"
        required={true}
        value={email}
        onChange={handleChange}
      />
      <OldInput
        label="Пароль"
        type="password"
        name="password"
        placeholder="Введіть пароль"
        required={true}
        value={password}
        onChange={handleChange}
      />
      <NavLink to="#">Забули пароль</NavLink>

      <Button type="submit" size="lg" disabled={!validationData}>
        Увійти
      </Button>
    </form>
  );
};

// LoginForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default LoginForm;
