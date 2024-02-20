import { useState, useEffect } from 'react';

import Input from 'shared/components/Input';
import Button from 'shared/components/Button';
import Heading from 'shared/components/Heading';

import styles from './ModalStatusUpdate.module.scss';

const ModalStatusUpdate = ({ onSubmitForm, email, _id, status }) => {
  const [confirmData, setConfirmData] = useState({
    email,
    password: '',
    _id,
    status,
  });
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  useEffect(() => {
    isValidPassword === 'isValid'
      ? setShowSubmitButton(true)
      : setShowSubmitButton(false);
  }, [isValidPassword]);

  const handleSubmit = e => {
    e.preventDefault();

    onSubmitForm(confirmData);
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setConfirmData(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Heading style={{ marginTop: '20px' }}>
        Для такої важливої операції потрібен пароль :){' '}
      </Heading>
      <Input
        className={styles.inputPass}
        type="password"
        name="password"
        placeholder="Введіть пароль"
        required={true}
        value={confirmData.password}
        validateStatus={setIsValidPassword}
        onChange={handleChange}
      />
      <Button
        className={styles.button}
        type="submit"
        size="lg"
        disabled={!showSubmitButton}
      >
        Підтверджую
      </Button>
    </form>
  );
};

export default ModalStatusUpdate;
