import { useState } from 'react';

import Input from 'shared/components/Input';
import Button from 'shared/components/Button';

import styles from './PersonalDataForm.module.scss';

const PersonalDataForm = ({
  firstName,
  middleName,
  lastName,
  onSubmitForm,
}) => {
  const [nameFocused, setNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [userInfo, setUserInfo] = useState({ firstName, middleName, lastName });

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(userInfo);
    setUserInfo(prevState => {
      return { ...prevState, [name]: value };
    });
    console.log(userInfo);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(userInfo);
    onSubmitForm(userInfo);
  };

  const onFocusName = () => {
    setNameFocused(true);
  };

  const onBlurName = () => {
    setNameFocused(false);
  };

  const onFocusLastName = () => {
    setLastNameFocused(true);
  };

  const onBlurLastName = () => {
    setLastNameFocused(false);
  };

  const cancelChanging = () => {
    setUserInfo({ firstName, lastName });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="firstName"
        label="Ім'я"
        placeholder={firstName}
        value={userInfo.firstName}
        onChange={e => handleChange(e)}
        onFocus={onFocusName}
        onBlur={onBlurName}
        style={{ marginBottom: '16px' }}
      />
      <Input
        name="middleName"
        label="По-батькові"
        placeholder={firstName}
        value={userInfo.middleName}
        onChange={e => handleChange(e)}
        onFocus={onFocusName}
        onBlur={onBlurName}
        style={{ marginBottom: '16px' }}
      />
      <Input
        name="lastName"
        label="Прізвище"
        placeholder={lastName}
        value={userInfo.lastName}
        onChange={e => handleChange(e)}
        onFocus={onFocusLastName}
        onBlur={onBlurLastName}
        style={{ marginBottom: '24px' }}
      />
      <div className={styles.buttonsContainer}>
        <Button
          type="submit"
          size="lg"
          disabled={
            !nameFocused &&
            !lastNameFocused &&
            userInfo.firstName === firstName &&
            userInfo.lastName === lastName
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
