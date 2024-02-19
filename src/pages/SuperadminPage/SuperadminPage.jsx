import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import {
  getUserByEmail,
  changeUserStatus,
} from 'shared/services/api/brovko/user';
import { addPopupOperation } from 'redux/popup/popupOperations';
// import { setEmail } from 'redux/status/statusSlice';

import { selectUser } from 'redux/user/userSelectors';
// import { selectEmail } from 'redux/status/statusSelectors';

import ModalStatusUpdate from 'components/Superadmin/ModalStatusUpdate';
import NewStatusOptions from 'components/Superadmin/NewStatusOptions';
import UserFound from 'components/Superadmin/UserFound';
import Rectangle from 'components/Rectangle';
import StatusSection from 'components/Superadmin/StatusSection';

import Heading from 'shared/components/Heading/Heading';
import Input from 'shared/components/Input/Input';
import Button from 'shared/components/Button/Button';
import Modal from 'shared/components/Modal/Modal';
import Loader from 'components/Loader';

import styles from './SuperadminPage.module.scss';

const SuperadminPage = () => {
  const [requestedEmail, setRequestedEmail] = useState('');
  const [userFound, setUserFound] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // const requestedEmail = useSelector(selectEmail);

  // useEffect(() => {
  //   setRequestedEmail(getEmail);
  // }, [getEmail]);

  const setUser = async data => {
    setUserFound(null);
    setLoading(true);
    try {
      const { user } = await getUserByEmail(data);
      setUserFound(user);
      dispatch(addPopupOperation('Знайшли такого'));
    } catch (e) {
      setUserFound(null);
      dispatch(
        addPopupOperation('Не знайшли... Пошта вірно прописана?', 'error')
      );
    }
    setLoading(false);
  };

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  const dispatch = useDispatch();

  const setNewStatus = data => {
    setStatus(data);
  };

  const currentUser = useSelector(selectUser);

  if (currentUser.status !== 'superadmin') {
    return <Navigate to="/" />;
  }

  const handleSubmit = async event => {
    event.preventDefault();
    await setUser(requestedEmail);
  };

  const onChangingEmail = e => {
    setRequestedEmail(e.target.value);
    // dispatch(setEmail(e.target.value));
  };

  const onChangingStatus = async data => {
    setLoading(true);
    try {
      await changeUserStatus(data);
      dispatch(addPopupOperation('Є, змінили статус!'), 'success');
    } catch (e) {
      dispatch(addPopupOperation('Щось не так, спробуйте знову'), 'error');
    }
    try {
      const { user } = await getUserByEmail(requestedEmail);
      setUserFound(user);
    } catch (e) {
      setUserFound(null);
      dispatch(
        addPopupOperation(
          'Не вдалося відобразити оновлені дані, спробуйте перезавантажити сторінку',
          'error'
        )
      );
    }
    setLoading(false);
    setIsModalOpen(false);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {loading && <Loader />}
      {isModalOpen && (
        <Modal closeModal={onCloseModal}>
          <ModalStatusUpdate
            onSubmitForm={onChangingStatus}
            email={currentUser.email}
            _id={userFound?._id}
            status={status}
          />
        </Modal>
      )}
      <Heading withGoBack fromHC={backLinkHref}>
        Superadmin's page
      </Heading>
      <form onSubmit={handleSubmit}>
        <Input
          label="Пошук користувача по емейлу :"
          onChange={onChangingEmail}
        />
        <Button type="submit" className={styles.findBtn}>
          Знайти
        </Button>
      </form>
      {userFound && (
        <>
          <div className={styles.userStatusBox}>
            <UserFound userFound={userFound} />
            <div className={styles.newStatusBox}>
              <NewStatusOptions
                oldStatus={userFound.status}
                setNewStatus={setNewStatus}
              />
              <Button
                className={styles.confirmBtn}
                onClick={() => setIsModalOpen(true)}
              >
                Підписати
              </Button>
            </div>
          </div>
        </>
      )}
      <Rectangle />
      <StatusSection />
    </>
  );
};

export default SuperadminPage;
