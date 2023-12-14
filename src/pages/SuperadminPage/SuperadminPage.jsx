import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import {
  getUserByEmail,
  changeUserStatus,
} from 'shared/services/api/brovko/user';

import { selectUser } from 'redux/user/userSelectors';

import ModalStatusUpdate from 'components/Superadmin/ModalStatusUpdate';

import Heading from 'shared/components/Heading/Heading';
import Input from 'shared/components/Input/Input';
import Button from 'shared/components/Button/Button';
import Image from 'shared/components/Image';
import Modal from 'shared/components/Modal/Modal';

import styles from './SuperadminPage.module.scss';

const SuperadminPage = () => {
  const [requestedEmail, setRequestedEmail] = useState('');
  const [userFound, setUserFound] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (userFound && userFound.status === 'manager') {
      setStatus('customer');
    } else if (userFound && userFound.status === 'customer') {
      setStatus('manager');
    }
  }, [userFound]);

  const currentUser = useSelector(selectUser);

  if (currentUser.status !== 'superadmin') {
    return <Navigate to="/" />;
  }

  const setUser = async () => {
    const { user } = await getUserByEmail(requestedEmail);
    setUserFound(user);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await setUser();
  };

  const onChangingEmail = e => {
    setRequestedEmail(e.target.value);
  };

  const onChangingStatus = async data => {
    await changeUserStatus(data);
    await setUser();
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <Modal closeModal={onCloseModal}>
          <ModalStatusUpdate
            onSubmitForm={onChangingStatus}
            email={currentUser.email}
            _id={userFound._id}
            status={status}
          />
        </Modal>
      )}
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
          <Button
            style={{ marginTop: '10px', marginBottom: '20px' }}
            onClick={() => setIsModalOpen(true)}
          >
            Змінити статус користувача
          </Button>
        </>
      )}
    </>
  );
};

export default SuperadminPage;
