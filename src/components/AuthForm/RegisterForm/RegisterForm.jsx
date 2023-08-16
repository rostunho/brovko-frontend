import TextField from 'shared/components/TextFields/TextFields';
import Button from 'shared/components/Button/Button';
import useForm from 'shared/hooks/useForm';
import fields from './fields';
import initialState from './initialState';

import css from './RegisterForm.module.scss';

const RegisterForm = ({ onSubmit }) => {
  const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit,
  });
  const { email, password } = state;
  return (
    <form onSubmit={handleSubmit}>
      <TextField value={email} handleChange={handleChange} {...fields.email} />
      <TextField
        value={password}
        handleChange={handleChange}
        {...fields.password}
      />
      <Button>Увійти</Button>
    </form>
  );
};

export default RegisterForm;
