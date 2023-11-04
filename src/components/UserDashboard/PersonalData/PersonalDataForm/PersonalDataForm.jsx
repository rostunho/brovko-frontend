import { useState } from 'react';

import Input from 'shared/components/Input';
import Button from 'shared/components/Button';

import styles from './PersonalDataForm.module.scss';

const PersonalDataForm = ({
  firstName,
  middleName,
  lastName,
  id,
  onSubmitForm,
}) => {
  const [userInfo, setUserInfo] = useState(() => ({
    firstName,
    middleName,
    lastName,
    id,
  }));

  const handleChange = e => {
    const { name, value } = e.target;

    setUserInfo(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmitForm(userInfo);
  };

  const cancelChanging = () => {
    setUserInfo({ firstName, middleName, lastName });
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        name="firstName"
        label="Ім'я"
        placeholder={firstName}
        value={userInfo.firstName}
        onChange={e => handleChange(e)}
      />
      <Input
        name="middleName"
        label="По-батькові"
        placeholder={firstName}
        value={userInfo.middleName}
        onChange={e => handleChange(e)}
      />
      <Input
        name="lastName"
        label="Прізвище"
        placeholder={lastName}
        value={userInfo.lastName}
        onChange={e => handleChange(e)}
      />
      <div className={styles.buttonsContainer}>
        <Button
          type="submit"
          size="lg"
          disabled={
            userInfo.firstName === firstName &&
            userInfo.lastName === lastName &&
            userInfo.middleName === middleName
          }
        >
          Зберегти
        </Button>
        <Button size="lg" mode="outlined" onClick={cancelChanging}>
          Скасувати
        </Button>
      </div>
    </form>
  );
};

export default PersonalDataForm;
