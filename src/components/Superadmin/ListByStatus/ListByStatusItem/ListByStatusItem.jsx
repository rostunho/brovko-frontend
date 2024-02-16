import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { selectUser } from 'redux/user/userSelectors';
import { addPopupOperation } from 'redux/popup/popupOperations';

import { changeUserStatus } from 'shared/services/api/brovko/user';

import Image from 'shared/components/Image';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal/Modal';

import ModalStatusUpdate from 'components/Superadmin/ModalStatusUpdate';
import NewStatusOptions from 'components/Superadmin/NewStatusOptions';

import styles from './ListByStatusItem.module.scss';

const ListByStatusItem = ({ user, selected, onToggleSelect }) => {
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const setNewStatus = data => {
    setStatus(data);
  };

  const onChangingStatus = async data => {
    setLoading(true);
    try {
      await changeUserStatus(data);
      dispatch(addPopupOperation('Є, змінили статус!'), 'success');
    } catch (e) {
      dispatch(addPopupOperation('Щось не так, спробуйте знову'), 'error');
    }
    setLoading(false);
    setIsModalOpen(false);
  };
  const currentUser = useSelector(selectUser);

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
            _id={user._id}
            status={status}
          />
        </Modal>
      )}
      <div className={styles.userContainer}>
        <div className={styles.imgWrapper}>
          <Image
            className={styles.avatar}
            src={user.avatarURL && user.avatarURL}
            text={user.firstName || user.email}
          />
        </div>
        <div>
          <p>{user.email}</p>
          <div className={styles.name}>
            <p>{user.firstName || "/Ім'я не вказано/"}</p>
            <p>{user.lastName || '/Прізвище не вказано/'}</p>
          </div>
          <p>{user.phone || '/Номер тел не вказано/'}</p>

          <div
            className={styles.toggleSelect}
            onClick={() =>
              selected !== user.email
                ? onToggleSelect(user.email)
                : onToggleSelect('')
            }
          >
            {selected === user.email ? 'Залишити все як є' : 'Змінити статус'}
          </div>
        </div>
        {selected === user.email && (
          <div
            className={`${styles.newStatusBox} ${!selected ? 'disable' : ''}`}
          >
            <NewStatusOptions
              oldStatus={user.status}
              setNewStatus={setNewStatus}
            />
            <Button
              className={styles.confirmBtn}
              onClick={() => {
                setIsModalOpen(true);
                onToggleSelect('');
              }}
            >
              Підписати
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ListByStatusItem;
