import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/user/userOperations';
// import PropTypes from 'prop-types';
import Input from 'shared/components/Input/Input';
import Button from 'shared/components/Button/Button';
import useForm from 'shared/hooks/useForm';
import initialState from './initialState';
import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit: dispatchUser,
  });
  const { email, password } = state;
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChecked, setPasswordChecked] = useState(false);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const condition =
      email && password.length > 0 && password === confirmPassword;

    condition ? setPasswordChecked(true) : setPasswordChecked(false);
  }, [email, password, confirmPassword]);

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
        style={{ backgroundColor: '#801f1f' }}
        type="email"
        name="email"
        placeholder="Введіть свій e-mail"
        required={true}
        value={email}
        onChange={handleChange}
      />
      <Input
        label="Пароль"
        type="password"
        name="password"
        placeholder="Введіть пароль"
        required={true}
        value={password}
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

      <Button type="submit" size="lg" disabled={!passwordChecked}>
        Зареєструватися
      </Button>
    </form>
  );
};

// RegisterForm.propTyprs = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default RegisterForm;
