import { useRef } from 'react';
import PropTypes from 'prop-types';
import Input from 'shared/components/Input/Input';
import Button from 'shared/components/Button/Button';
import useForm from 'shared/hooks/useForm';
import initialState from './initialState';
import styles from './LoginForm.module.scss';

const LoginForm = ({ onSubmit }) => {
  const formRef = useRef(null);

  const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit,
  });
  const { email, password } = state;
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

      <Button type="submit" size="lg">
        Увійти
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
