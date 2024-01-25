import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { resetPassword } from 'redux/user/userOperations';
import { errorAuth, selectIsPswReset } from 'redux/user/userSelectors';
import Input from 'shared/components/Input';
import Button from 'shared/components/Button/Button';
import Text from 'shared/components/Text/Text';
import useForm from 'shared/hooks/useForm';
import initialState from './initialState';
import styles from './ResetPswForm.module.scss';

const ResetPswForm = () => {
  const { state, setState, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit: dispatchPassword,
  });

  const { password } = state;
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const formRef = useRef(null);
  const errorReset = useSelector(errorAuth);
  const resetPswSuccess = useSelector(selectIsPswReset);
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();
  const { token } = useParams();
  console.log(resetPswSuccess);

  useEffect(() => {
    password === confirmPassword
      ? setPasswordChecked(true)
      : setPasswordChecked(false);
  }, [confirmPassword, password]);

  useEffect(() => {
    isValidPassword === 'isValid' && passwordChecked
      ? setShowSubmitButton(true)
      : setShowSubmitButton(false);
  }, [isValidPassword, passwordChecked]);

  function dispatchPassword(password) {
    dispatch(resetPassword({ token, password }));
  }

  useEffect(() => {
    if (errorReset) {
      setFormError(errorReset);
    }
  }, [errorReset]);

  useEffect(() => {
    setFormError(null);
  }, []);

  if (resetPswSuccess) {
    return (
      <p>
        Пароль успішно змінено!!! Тепер ви можете{' '}
        <NavLink to="/auth/login">Увійти</NavLink>
      </p>
    );
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
      {formError && <Text className={styles.textError}>{formError}</Text>}
      <Input
        label="Пароль"
        type="password"
        name="password"
        placeholder="Введіть новий пароль"
        required={true}
        value={password}
        validateStatus={setIsValidPassword}
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
      <Button
        type="submit"
        className={styles['submit-button']}
        size="lg"
        disabled={!showSubmitButton}
      >
        Зберегти
      </Button>
    </form>
  );
};

// RegisterForm.propTyprs = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default ResetPswForm;
