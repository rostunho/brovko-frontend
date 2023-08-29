import PropTypes from 'prop-types';
import Input from 'shared/components/Input/Input';
import Button from 'shared/components/Button/Button';
import useForm from 'shared/hooks/useForm';
import { useRef } from 'react';

import initialState from './initialState';

import styles from './RegisterForm.module.scss';

const RegisterForm = ({ onSubmit }) => {
  const formRef = useRef(null);

  const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit,
  });
  const { email, password, confirmPassword } = state;
  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="E-mail"
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
        onChange={handleChange}
      />

      <Button
        style={{ paddingLeft: 86, paddingRight: 86, marginTop: 36 }}
        type="submit"
        size="lg"
      >
        Зареєструватися
      </Button>
    </form>
  );
};

RegisterForm.propTyprs = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterForm;
