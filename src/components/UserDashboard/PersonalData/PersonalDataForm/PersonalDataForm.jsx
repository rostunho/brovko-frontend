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
  // const [firstNameFocused, setFirstNameFocused] = useState(false);
  // const [middleNameFocused, setMiddleNameFocused] = useState(false);
  // const [lastNameFocused, setLastNameFocused] = useState(false);
  const [userInfo, setUserInfo] = useState(() => ({
    firstName,
    middleName,
    lastName,
  }));

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

  // const onFocusFirstName = () => {
  //   setFirstNameFocused(true);
  // };

  // const onBlurFirstName = () => {
  //   setFirstNameFocused(false);
  // };

  // const onFocusMiddleName = () => {
  //   setMiddleNameFocused(true);
  // };

  // const onBlurMiddleName = () => {
  //   setMiddleNameFocused(false);
  // };

  // const onFocusLastName = () => {
  //   setLastNameFocused(true);
  // };

  // const onBlurLastName = () => {
  //   setLastNameFocused(false);
  // };

  const cancelChanging = () => {
    setUserInfo({ firstName, middleName, lastName });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="firstName"
        label="Ім'я"
        placeholder={firstName}
        value={userInfo.firstName}
        onChange={e => handleChange(e)}
        // onFocus={onFocusFirstName}
        // onBlur={onBlurFirstName}
        style={{ marginBottom: '16px' }}
      />
      <Input
        name="middleName"
        label="По-батькові"
        placeholder={firstName}
        value={userInfo.middleName}
        onChange={e => handleChange(e)}
        // onFocus={onFocusMiddleName}
        // onBlur={onBlurMiddleName}
        style={{ marginBottom: '16px' }}
      />
      <Input
        name="lastName"
        label="Прізвище"
        placeholder={lastName}
        value={userInfo.lastName}
        onChange={e => handleChange(e)}
        // onFocus={onFocusLastName}
        // onBlur={onBlurLastName}
        style={{ marginBottom: '24px' }}
      />
      <div className={styles.buttonsContainer}>
        <Button
          type="submit"
          size="lg"
          disabled={
            // !firstNameFocused &&
            // !lastNameFocused &&
            // !middleNameFocused &&
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
