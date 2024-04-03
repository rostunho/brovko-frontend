import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'redux/user/userOperations';
import { errorAuth, selectIsLoadingUser } from 'redux/user/userSelectors';
// import PropTypes from 'prop-types';
// import OldInput from 'shared/components/OldInput/OldInput';
import Input from 'shared/components/Input';
import Button from 'shared/components/Button/Button';
import Text from 'shared/components/Text/Text';
import Loader from 'components/Loader';
import useForm from 'shared/hooks/useForm';
import initialState from './initialState';
import UserConsent from './UserConsent';
import styles from './RegisterForm.module.scss';

import useProductInBasket from 'shared/hooks/useProductInBasket';

const RegisterForm = () => {
  const { state, setState, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit: dispatchUser,
  });
  const { email, password } = state;
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const formRef = useRef(null);
  const errorRegister = useSelector(errorAuth);
  const isLoading = useSelector(selectIsLoadingUser);
  const [formError, setFormError] = useState(null);

  const { showBascketOrders } = useProductInBasket();
  const products = showBascketOrders();

  const dispatch = useDispatch();

  useEffect(() => {
    password === confirmPassword
      ? setPasswordChecked(true)
      : setPasswordChecked(false);
  }, [confirmPassword, password]);

  useEffect(() => {
    isValidEmail === 'isValid' &&
    isValidPassword === 'isValid' &&
    passwordChecked
      ? setShowSubmitButton(true)
      : setShowSubmitButton(false);
  }, [isValidEmail, isValidPassword, passwordChecked]);

  function dispatchUser(data) {
    const lowerCaseEmail = data.email.toLowerCase();
    let newData;
    if (products) {
      newData = { ...data, email: lowerCaseEmail, products: products };
    } else {
      newData = { ...data, email: lowerCaseEmail };
    }
    dispatch(register(newData)).then(() => {
      setState({ ...newData });
    });
  }

  useEffect(() => {
    if (errorRegister) {
      setFormError(errorRegister);
    }
  }, [errorRegister]);

  useEffect(() => {
    setFormError(null);
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={e => {
        handleSubmit(e);
        setConfirmPassword('');
      }}
      className={styles.form}
    >
      <Text style={{ marginBottom: '8px' }}>
        Створення облікового запису допоможе купувати швидше, а також
        переглядати замовлення зроблені раніше.
      </Text>
      {isLoading && <Loader />}

      <Input
        label="E-mail"
        type="email"
        name="email"
        placeholder="Введіть свій e-mail"
        required={true}
        value={email}
        validateStatus={setIsValidEmail}
        onChange={handleChange}
        inputClassName={formError ? styles['input--reg-error'] : ''}
      />
      {formError && <Text className={styles.textError}>{formError}</Text>}

      <Input
        label="Пароль"
        type="password"
        name="password"
        placeholder="Введіть пароль"
        required={true}
        // value={password}
        validateStatus={setIsValidPassword}
        onChange={handleChange}
      />
      <Input
        label="Підтвердження паролю"
        type="password"
        name="confirmPassword"
        placeholder="Підтвердіть пароль"
        required={true}
        // value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <UserConsent />
      <Button
        type="submit"
        className={styles['submit-button']}
        size="lg"
        disabled={!showSubmitButton}
      >
        Зареєструватися
      </Button>
    </form>
  );
};

// RegisterForm.propTyprs = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default RegisterForm;
