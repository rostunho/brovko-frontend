import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import {
  getUserByEmail,
  changeUserStatus,
} from 'shared/services/api/brovko/user';

import { selectUser } from 'redux/user/userSelectors';

import ModalStatusUpdate from 'components/Superadmin/ModalStatusUpdate';
import NewStatusOptions from 'components/Superadmin/NewStatusOptions';
import UserFound from 'components/Superadmin/UserFound';
import Rectangle from 'components/Rectangle';
import StatusSection from 'components/Superadmin/StatusSection';

import Heading from 'shared/components/Heading/Heading';
import Input from 'shared/components/Input/Input';
import Button from 'shared/components/Button/Button';
import Modal from 'shared/components/Modal/Modal';

const SuperadminPage = () => {
  const [requestedEmail, setRequestedEmail] = useState('');
  const [userFound, setUserFound] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('');

  const setNewStatus = data => {
    setStatus(data);
  };

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
    setIsModalOpen(false);
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
          style={{ marginTop: '16px', marginBottom: '32px' }}
        >
          Знайти
        </Button>
      </form>
      {userFound && (
        <>
          <UserFound userFound={userFound} />
          <NewStatusOptions
            oldStatus={userFound.status}
            setNewStatus={setNewStatus}
          />
          <Button
            style={{ marginTop: '10px', marginBottom: '32px' }}
            onClick={() => setIsModalOpen(true)}
          >
            Підписати
          </Button>
        </>
      )}
      <Rectangle />
      <StatusSection />
    </>
  );
};

export default SuperadminPage;
