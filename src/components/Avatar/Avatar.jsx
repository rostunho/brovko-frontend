import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectUser } from 'redux/user/userSelectors';
import { update, updateAvatar } from 'redux/user/userOperations';

import Loader from 'components/Loader';

import { addPopupOperation } from 'redux/popup/popupOperations';

import Modal from 'shared/components/Modal/Modal';
import Image from 'shared/components/Image';
import Button from 'shared/components/Button';
import TrashIcon from 'shared/icons/TrashIcon';
import EditIcon from 'shared/icons/EditIcon';
import CameraIcon from 'shared/icons/CameraIcon';

import styles from './avatar.module.scss';

const Avatar = ({
  size = 96,
  marginLeft = 'auto',
  marginRight = 'auto',
  marginBottom = 32,
  fontSize = 36,
  border = 'none',
  locked = false,
  src,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModalEditPhoto = () => {
    if (size === '32px') {
      return;
    }

    setModalIsOpen(true);
  };
  const closeModalEditPhoto = () => {
    setModalIsOpen(false);
    setPrompDelete(false);
  };
  const { user } = useSelector(selectUser);

  const dispatch = useDispatch();

  const delAvatar = async () => {
    try {
      setLoading(true);
      const dataAvatar = { avatarURL: '', id: user?._id };

      await dispatch(update(dataAvatar));
      dispatch(addPopupOperation('Аватарку успішно видалено'));
      setPrompDelete(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // console.log(error.response);
      dispatch(
        addPopupOperation('Не вдалося видалити, спробуйте ще разок', 'error')
      );
    }
  };

  const [prompDelete, setPrompDelete] = useState(false);


  const onSubmitForm = e => {
    e.preventDefault();
    // Your form submission logic
  };

  const addImage = async e => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('avatar', file);
        await dispatch(updateAvatar(formData));
        dispatch(addPopupOperation('Круте фото!'));
        // .then(() => {
        //   // Оновлення avatarURL після успішного завантаження
        //   // Це дозволяє вам відобразити новий аватар без перезавантаження сторінки
        //   dispatch(fetchUser()); // Припустимо, що у вас є дія fetchUser для отримання оновленого користувача
        // });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        dispatch(
          addPopupOperation('Щось пішло не так, завантажте ще разок', 'error')
        );
      }
    }
  };

  const resetPromp = () => setPrompDelete(false);

  if (locked) {
    return (
      <div
        className={styles.wrapper}
        style={{
          width: size,
          height: size,
          marginLeft,
          marginRight,
          marginBottom,
          border:
            user?.status === 'customer'
              ? '2px solid #F3A610'
              : '2px solid #4d95c3',
        }}
      >
        <Image
          className={styles.avatar}
          src={src || user?.avatarURL}
          text={user?.firstName || user?.email}
          height={size}
          width={size}
          fontSize={fontSize}
        />
        {size > 40 && <CameraIcon className={styles.cameraIcon} />}
      </div>
    );
  }

  return (
    <>
      {loading && <Loader />}
      <Button
        className={styles.wrapper}
        style={{
          width: size,
          height: size,
          marginLeft,
          marginRight,
          marginBottom,
          border:
            user?.status === 'customer'
              ? '2px solid #F3A610'
              : '2px solid #4d95c3',
        }}
        onClick={openModalEditPhoto}
      >
        <Image
          className={styles.avatar}
          src={user?.avatarURL}
          text={user?.firstName || user?.email}
          height={size}
          width={size}
          fontSize={fontSize}
        />
        {size > 40 && <CameraIcon className={styles.cameraIcon} />}
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
              src={!prompDelete && user?.avatarURL}
              text={user?.firstName || user?.email}
            />
          </div>
          {prompDelete && (
            <p className={styles.text}>
              Попереднє зображення буде видалено, а замість нього
              використовуватиметься це
            </p>
          )}
          <form onSubmit={onSubmitForm} className={styles.buttonsContainer}>
            <label className={styles.fileInputLabel}>
              {!prompDelete && <EditIcon />}
              {prompDelete ? 'Скасувати' : 'Змінити'}
              <input
                className={styles.visuallyHidden}
                // id="submit"
                type={!prompDelete ? 'file' : 'button'}
                accept="image/jpeg, image/png"
                onClick={
                  prompDelete
                    ? e => {
                        e.preventDefault();
                        resetPromp();
                      }
                    : undefined
                }
                onChange={e => {
                  e.preventDefault();
                  addImage(e);
                }}
              />
            </label>
            {user?.avatarURL && (
              <Button
                onClick={prompDelete ? delAvatar : () => setPrompDelete(true)}
                mode={!prompDelete ? 'outlined' : 'primary'}
              >
                {!prompDelete && <TrashIcon />}Видалити
              </Button>
            )}
          </form>
        </Modal>
      )}
    </>
  );
};

export default Avatar;
