import { useState } from 'react';
// import { useSelector } from 'react-redux';

import {
  getUserByEmail,
  changeUserStatus,
} from 'shared/services/api/brovko/user';

// import { selectUser } from 'redux/user/userSelectors';

import Heading from 'shared/components/Heading/Heading';
import Input from 'shared/components/Input/Input';
import Button from 'shared/components/Button/Button';
import Image from 'shared/components/Image';

import styles from './SuperadminPage.module.scss';

const SuperadminPage = () => {
  const [requestedEmail, setRequestedEmail] = useState('');
  const [userFound, setUserFound] = useState(null);

  // карент потрібний буде в майбутньому, щоб провіряти чи він суперадмін і якщо ні, то перекидувати в інше місце
  // const currentUser = useSelector(selectUser);
  // console.log(currentUser, 'current');

  const handleSubmit = async event => {
    event.preventDefault();
    const { user } = await getUserByEmail(requestedEmail);
    setUserFound(user);
    console.log(userFound);
  };

  const onChangingEmail = e => {
    setRequestedEmail(e.target.value);
  };

  const onChangingStatus = () => {
    console.log('we want to change status');
    if (userFound && userFound.status === 'manager') {
      console.log(userFound._id);
      changeUserStatus(userFound._id, 'customer');
    } else if (userFound && userFound.status === 'customer') {
      console.log(userFound._id);
      changeUserStatus(userFound._id, 'manager');
    }
  };

  return (
    <>
      <Heading withGoBack>Superadmin's page</Heading>
      <form onSubmit={handleSubmit}>
        <Input
          label="Пошук користувача по емейлу :"
          onChange={onChangingEmail}
        />
        <Button
          type="submit"
          style={{ marginTop: '10px', marginBottom: '10px' }}
        >
          Знайти
        </Button>
      </form>
      {userFound && (
        <>
          <p>Користувач, якого вдалося знайти:</p>
          <div className={styles.wrapper}>
            <Image
              className={styles.avatar}
              src={userFound.avatarURL && userFound.avatarURL}
              text={userFound.firstName || userFound.email}
            />
          </div>
          <p>Прізвиище: {userFound.lastName || ''}</p>
          <p>Ім'я: {userFound.firstName || ''}</p>
          <p>По-батькові: {userFound.middleName || ''}</p>
          <p>Номер телефону: {userFound.phone || ''}</p>
          <p>Статус: {userFound.status || ''}</p>
          <Button style={{ marginTop: '10px' }} onClick={onChangingStatus}>
            Змінити статус користувача
          </Button>
        </>
      )}
    </>
  );
};

export default SuperadminPage;
