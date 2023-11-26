import Image from 'shared/components/Image';

import CameraIcon from 'shared/icons/CameraIcon';

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
    setPrompDelete(false);
  };
  const { firstName, email, avatarURL, _id } = useSelector(selectUser);
  console.log(useSelector(selectUser));
  const dispatch = useDispatch();

  const delAvatar = () => {
    const dataAvatar = { avatarURL: '', id: _id };
    dispatch(update(dataAvatar));
    setPrompDelete(false);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [prompDelete, setPrompDelete] = useState(false);
  // const add = e => {
  //   e.preventDefault();
  //   const file = e.target.files[0];
  //   if (file) {
  //     // setSelectedImage(file);

  //     const formData = new FormData();
  //     // const formElem = {}
  //     // formElem.addEventListener('submit', (e) => {
  //     // on form submission, prevent default
  //     e.preventDefault();

  //     // construct a FormData object, which fires the formdata event
  //     // new FormData(formData);
  //     // });
  //     formData.append('avatar', file);
  //     // updateAvatar.preventDefault()
  //     dispatch(updateAvatar(formData));
  //   }
  // };

  const onSubmitForm = e => {
    e.preventDefault();
    // Your form submission logic
  };

  const add = e => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      const formData = new FormData();
      formData.append('avatar', file);

      dispatch(updateAvatar(formData));
      // .then(() => {
      //   // Оновлення avatarURL після успішного завантаження
      //   // Це дозволяє вам відобразити новий аватар без перезавантаження сторінки
      //   dispatch(fetchUser()); // Припустимо, що у вас є дія fetchUser для отримання оновленого користувача
      // });
    }
  };

  // setSelectedImage(prevImage => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('avatar', file);
  //     dispatch(updateAvatar(formData));
  //   }
  //   return file;
  // });
  const resetPromp = () => setPrompDelete(false);

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
          <p className={styles.mainText}>
            {!prompDelete
              ? 'Зображення профілю'
              : 'Видалити зображення профілю?'}
          </p>
          <div className={styles.wrapper}>
            <Image
              className={styles.avatarEdit}
              src={!prompDelete && avatarURL}
              text={firstName || email}
            />
          </div>
          {prompDelete && (
            <p className={styles.text}>
              Попереднє зображення буде видалено, а замість нього
              використовуватиметься це
            </p>
          )}
          <form
            // onSubmit={onSubmitForm}
            className={styles.buttonsContainer}
          >
            <label className={styles.fileInputLabel}>
              {!prompDelete && <EditIcon />}
              {prompDelete ? 'Скасувати' : 'Змінити'}
              <input
                className={styles.visuallyHidden}
                // id="submit"
                type={!prompDelete ? 'file' : 'button'}
                accept="image/jpeg, image/png"
                //  {prompDelete && onClick={() => setPrompDelete(false)} }
                // onClick={prompDelete ? undefined : () => resetPromp()}
                // onClick={prompDelete ? undefined : resetPromp}
                // onClick={prompDelete ? undefined : () => resetPromp()}
                // {(prompDelete ? { onClick: () => setPrompDelete(false) } : {})}
                // onClick={prompDelete && (() => setPrompDelete(false))}
                onClick={prompDelete ? (e) => { e.preventDefault(); resetPromp(); } : undefined}
                onChange={add}
              />
            </label>
            <Button
              onClick={prompDelete ? delAvatar : () => setPrompDelete(true)}
              mode={!prompDelete ? 'outlined' : 'primary'}
            >
              {!prompDelete && <TrashIcon />}Видалити
            </Button>
          </form>
          {/* <Button  onClick={prompDelete ? delAvatar : () => setPrompDelete(true)}  mode={!prompDelete ? "outlined" : 'primary'}>
              {!prompDelete && <TrashIcon />} Видалити
            </Button> */}
        </Modal>
      )}
    </>
  );
};

export default Avatar;
