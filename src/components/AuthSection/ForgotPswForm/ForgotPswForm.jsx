import { useState, useRef, useEffect } from 'react';

import Input from 'shared/components/Input';
import Button from 'shared/components/Button/Button';
import useForm from 'shared/hooks/useForm';
import initialState from './initialState';
import styles from './ForgotPswForm.module.scss';

const ForgotPswForm = () => {
  const { state, handleChange, handleSubmit } = useForm(initialState);
  const { email } = state;
  const formRef = useRef(null);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  useEffect(() => {
    isValidEmail === 'isValid'
      ? setShowSubmitButton(true)
      : setShowSubmitButton(false);
  }, [isValidEmail]);

  console.log('email sent');

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
      <Button
        type="submit"
        className={styles['submit-button']}
        size="lg"
        disabled={!showSubmitButton}
      >
        Скинути пароль
      </Button>
    </form>
  );
};

export default ForgotPswForm;
