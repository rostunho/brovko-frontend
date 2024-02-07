import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRequestSuccess } from 'redux/user/userSelectors';
import { forgotPassword } from 'redux/user/userOperations';
import { errorAuth } from 'redux/user/userSelectors';
import Input from 'shared/components/Input';
import Button from 'shared/components/Button/Button';
import Heading from 'shared/components/Heading';
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
  const isRequestSuccess = useSelector(selectRequestSuccess);
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
  useEffect(() => {
    if (errorSendRequest) {
      setFormError(errorSendRequest);
    }
  }, [errorSendRequest]);

  useEffect(() => {
    setFormError(null);
  }, []);
  if (isRequestSuccess) {
    return (
      <>
        <Heading type="h3">Перевірте вашу пошту</Heading>
        <Text className={styles.msg_text}>
          Лист з посиланням для відновлення паролю успішно відправлено на вашу
          електронну адресу. Будь ласка, перевірте вашу поштову скриньку. Перш
          ніж відправити повторний запит, зачекайте. Можливо, доставка
          повідомлення може зайняти кілька хвилин.
        </Text>
      </>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      <Text className={styles.text}>
        Будь ласка, введіть вашу e-mail адресу. Ви отримаєте електронний лист з
        посиланням для створення нового паролю.
      </Text>
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
      {formError && <Text className={styles.textError}>{formError}</Text>}
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
