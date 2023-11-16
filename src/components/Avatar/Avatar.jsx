import Image from 'shared/components/Image';

import CameraIcon from 'shared/icons/CameraIcon';
import UserLight from 'shared/icons/UserLight';

import styles from './avatar.module.scss';
import Button from 'shared/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'redux/user/userSelectors';
import { useState } from 'react';
import Modal from 'shared/components/Modal/Modal';
import { update } from 'redux/user/userOperations';

const Avatar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModalEditPhoto = () => {
    setModalIsOpen(true);
    console.log('addPhoto');
  };
  const closeModalEditPhoto = () => {
    setModalIsOpen(false);
  };
  const { firstName, email, avatarURL, middleName, _id } =
    useSelector(selectUser);
  console.log(useSelector(selectUser));
  const dispatch = useDispatch();
  const [userAvatar, setUserAvatar] = useState(() => ({
    avatarURL,
    _id,
  }));
 
  const onSubmitForm = () => {
    
    dispatch(
      update(setUserAvatar(prevState => {
        return { ...prevState,  avatarURL: 'https://shkvarka.ua/wp-content/uploads/dzherky_svyniachi_hryby-1-scaled.jpeg' };
      }))
      )
    ;
  };

  const delAvatar = () => {
    setUserAvatar(prevState => {
      return { ...prevState, avatarURL: ''};
    });
    dispatch(update({ avatarURL: '' }));
  };

  return (
    <>
      <Button className={styles.wrapper} onClick={openModalEditPhoto}>
        <Image
          className={styles.avatar}
          src={avatarURL}
          text={firstName || email}
        />
        <CameraIcon className={styles.cameraIcon} />
      </Button>
      {modalIsOpen && (
        <Modal closeModal={closeModalEditPhoto}>
          <p>Зображення профілю</p>
          <Image
            className={styles.avatar}
            src={avatarURL}
            text={firstName || email}
          />
          <Button
            type="submit"
            size="lg"
            mode="outlined"
            onClick={onSubmitForm}
          >
            Змінити
          </Button>
          <Button 
          type="submit" 
          onClick={delAvatar}>
            Видалити
          </Button>
        </Modal>
      )}
    </>
  );
};

export default Avatar;
