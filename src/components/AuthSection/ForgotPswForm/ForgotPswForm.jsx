import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { forgotPassword } from 'redux/user/userOperations';
import { errorAuth } from 'redux/user/userSelectors';
import Input from 'shared/components/Input';
import Button from 'shared/components/Button/Button';
import Text from 'shared/components/Text/Text';
import useForm from 'shared/hooks/useForm';
import initialState from './initialState';
import styles from './ForgotPswForm.module.scss';

const ForgotPswForm = () => {
  const { state, setState, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit: dispatchEmail,
  });
  const { email } = state;
  const formRef = useRef(null);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const errorSendRequest = useSelector(errorAuth);
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    isValidEmail === 'isValid'
      ? setShowSubmitButton(true)
      : setShowSubmitButton(false);
  }, [isValidEmail]);

  function dispatchEmail(data) {
    const lowerCaseEmail = data.email.toLowerCase();
    const newData = { ...data, email: lowerCaseEmail };
    dispatch(forgotPassword(newData)).then(() => {
      setState({ ...newData });
    });
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
      <Button
        type="submit"
        className={styles['submit-button']}
        size="lg"
        disabled={!showSubmitButton}
      >
        Скинути пароль
      </Button>
      {errorSendRequest && <Text>{errorSendRequest}</Text>}
    </form>
  );
};

export default ForgotPswForm;
