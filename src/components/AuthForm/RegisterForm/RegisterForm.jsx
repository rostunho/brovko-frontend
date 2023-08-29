// import TextField from 'shared/components/TextFields/TextFields';
import Input from 'shared/components/Input/Input';
import Button from 'shared/components/Button/Button';
import useForm from 'shared/hooks/useForm';
// import fields from './fields';
import initialState from './initialState';

import styles from './RegisterForm.module.scss';

const RegisterForm = ({ onSubmit }) => {
  const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit,
  });
  const { email, password, confirmPassword} = state;
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* <TextField value={email} handleChange={handleChange} {...fields.email} />
      <TextField
        value={password}
        handleChange={handleChange}
        {...fields.password}
      /> */}
      <Input
        label="E-mail"
        type="email"
        name="email"
        placeholder="Введіть свій e-mail"
        required="true"
        value={email}
        handleChange={handleChange}
      />
      <Input
        label="Пароль"
        type="password"
        name="password"
        placeholder="Введіть пароль"
        required="true"
        value={password}
        handleChange={handleChange}
      />
      <Input
        label="Підтвердження паролю"
        type="password"
        name="confirmPassword"
        placeholder="Підтвердіть пароль"
        required="true"
        value={confirmPassword}
        handleChange={handleChange}
      />

      <Button style={{ paddingLeft: 86, paddingRight: 86, marginTop: 36 }} size="lg">
        Зареєструватися
      </Button>
    </form>
  );
};

export default RegisterForm;
