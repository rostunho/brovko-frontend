import Image from 'shared/components/Image';

import CameraIcon from 'shared/icons/CameraIcon';
import UserLight from 'shared/icons/UserLight';

import styles from './avatar.module.scss';
import Button from 'shared/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'redux/user/userSelectors';
import { useState } from 'react';
import Modal from 'shared/components/Modal/Modal';
import { update, updateAvatar } from 'redux/user/userOperations';
import TrashIcon from 'shared/icons/TrashIcon';
import EditIcon from 'shared/icons/EditIcon';

const Avatar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModalEditPhoto = () => {
    setModalIsOpen(true);
  };
  const closeModalEditPhoto = () => {
    setModalIsOpen(false);
  };
  const { firstName, email, avatarURL, _id } = useSelector(selectUser);
  console.log(useSelector(selectUser));
  const dispatch = useDispatch();

  const delAvatar = () => {
    const dataAvatar = { avatarURL: '', id: _id };
    dispatch(update(dataAvatar));
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState('');

  const add = e => {
    e.preventDefault();
    setSelectedImage(e.target.files[0]);
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    dispatch(updateAvatar(formData));
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
       <div className={styles.buttonsContainer}>   <label className={styles.fileInputLabel}>
            <EditIcon /> Виберіть файл
            <input
              className={styles.visuallyHidden}
              type="file"
              accept="image/jpeg, image/png"
              onChange={add}
            />
          </label>
          <Button onClick={delAvatar} mode = 'primary'>
            <TrashIcon /> Видалити
          </Button></div>
        </Modal>
      )}
    </>
  );
};

export default Avatar;
