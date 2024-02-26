import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectUser } from 'redux/user/userSelectors';
import { addFeedback } from 'shared/services/api/brovko/feedback';
import Input from 'shared/components/Input';
import Textarea from 'shared/components/Textarea';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal/Modal';
import { addPopupOperation } from 'redux/popup/popupOperations';
import styles from './Contacts.module.scss';
import AddIconImage from 'shared/icons/AddIconImage';
import Image from 'shared/components/Image';

function FeedbackForm() {
  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    text: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.user.firstName || '',
        email: user.user.email || '',
        phone: user.user.phone || null,
      });
    }
  }, [user]);
  console.log('user.email', user.user.email);
  console.log('user formData', formData);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addFeedback(formData, setFormData);
      setFormData(prevData => ({ ...prevData, text: '' }));
      setShowThankYouModal(true);
    } catch (error) {
      console.error('Error submit feedback', error.response.data.message);
      if (
        error.response.data.message ===
        'Мінімальна довжина тексту повинна бути не менше 10 символів'
      ) {
        dispatch(
          addPopupOperation(
            'Мінімальна довжина тексту повинна бути не менше 10 символів',
            'error'
          )
        );
      } else {
        dispatch(
          addPopupOperation('Щось пішло не так, спробуй пізніше', 'error')
        );
      }
    }
  };

  const closeModal = () => {
    setShowThankYouModal(false);
  };

  const thankYouModalContent = (
    <Modal closeModal={closeModal}>
      <div className={styles.modal}>
        <h2>Дякуємо за повідомлення!</h2>
        <p className={styles.modalText}>
          Незабаром наш співробітник звʼяжеться з Вами.
        </p>
      </div>
    </Modal>
  );

  const [selectedImagesReview, setSelectedImagesReview] = useState([]);
  const [selectedPicturesReview, setSelectedPicturesReview] = useState([]);
  const [selectedFilesReview, setSelectedFilesReview] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsImage, setModalIsImage] = useState(false);
  const [modalIsId, setModalIsId] = useState(false);
  const [prompDelete, setPrompDelete] = useState(true);
  const [errorTextQuantity, setErrorTextQuantity] = useState(false);

  const openModalEditPhoto = (id, url) => {
    setModalIsId(id);
    setModalIsImage(url);
    setModalIsOpen(true);
  };

  const closeModalEditPhoto = () => {
    setModalIsOpen(false);
    setPrompDelete(false);
  };

  const delPhoto = id => {
    setSelectedPicturesReview(prevPictures => {
      const updatedPictures = prevPictures
        .filter(picture => picture.id !== id)
        .map((picture, index) => ({ ...picture, id: index }));
      return updatedPictures;
    });
    closeModalEditPhoto();
    dispatch(addPopupOperation('Фото видалено'));
  };

  const handleImageChange = (e, xFiles = 5 - selectedPicturesReview.length) => {
    e.preventDefault();
    const files = Array.from(e.target.files);

    if (files.length > 0 && files.length <= xFiles) {
      setSelectedFilesReview(files);
      addImages(files);
      setErrorTextQuantity(false);
    } else {
      dispatch(
        addPopupOperation(`Можна завантажити не більше ${xFiles} файлів`)
      );
      setErrorTextQuantity(`Ви обрали більше ніж ${xFiles} фото`);
    }
  };
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (e, toIndex) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const draggedPicture = selectedPicturesReview[fromIndex];

    // Create a copy of the selectedPicturesReview array
    const updatedPictures = [...selectedPicturesReview];

    // Remove the picture from its original position
    updatedPictures.splice(fromIndex, 1);

    // Insert the picture at the new position
    updatedPictures.splice(toIndex, 0, draggedPicture);

    const reorderedPictures = updatedPictures.map((picture, index) => ({
      ...picture,
      id: index,
    }));

    setSelectedPicturesReview(reorderedPictures);
  };

  const addImages = files => {
    if (!files.length) {
      return;
    }

    const newImages = files
      .map((file, index) => {
        if (file instanceof Blob) {
          return {
            id: selectedPicturesReview.length + index,
            file, // Додаємо оригінальний файл до об'єкта
            url: URL.createObjectURL(file),
          };
        } else if (typeof file === 'string' && file.startsWith('blob:')) {
          return {
            id: selectedPicturesReview.length + index,
            file, // Додаємо оригінальний файл до об'єкта
            url: file,
          };
        } else {
          console.error('Invalid file:', file);
          addPopupOperation(`Не правильний файл: ${file}`);
          return null;
        }
      })
      .filter(Boolean);

    setSelectedImagesReview(prevImages => [...prevImages, ...newImages]); // Змінено тут
    setSelectedPicturesReview(prevPictures => [...prevPictures, ...newImages]); // Змінено тут
    dispatch(
      addPopupOperation(
        `Додано ${newImages.length} файл${
          newImages.length === 1 ? '' : newImages.length < 5 ? 'и' : 'ів'
        }`
      )
    );
    setSelectedFilesReview([]);
  };

  const images = selectedPicturesReview.map(({ id, url }, index) => (
    <Button
      key={index}
      className={styles['add-image-button']}
      type="button"
      draggable
      onDragStart={e => handleDragStart(e, index)}
      onDrop={e => handleDrop(e, index)}
      onClick={e => {
        openModalEditPhoto(index, url);
      }}
    >
      <Image
        key={id}
        src={url}
        alt={`preview-${index + 1}`}
        className={styles['add-image-img']}
      />
    </Button>
  ));

  const inputPhoto = index => (
    <label className={styles['file-input-label']} key={index}>
      <input
        className={styles['visually-hidden']}
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        multiple
        onChange={e => handleImageChange(e)}
      />
      <AddIconImage />
    </label>
  );

  const inputPhotos = () => {
    const remainingInputs = Math.max(5 - selectedPicturesReview.length, 0);
    const inputsPhoto = [];

    for (let index = 0; index < remainingInputs; index++) {
      const element = inputPhoto(index);
      inputsPhoto.push(element);
    }

    return inputsPhoto;
  };

  const modalWindow = (
    <Modal
      closeModal={closeModalEditPhoto}
      className={styles['modal-container']}
    >
      <div className={styles.modal}>
        <p className={styles['main-text']}>
          {false
            ? 'Видалення зображення'
            : 'Ти дійсно бажаєш видалити це фото?'}
        </p>
        <Image
          key={modalIsId}
          src={modalIsImage}
          alt={`preview-${modalIsId}`}
          className={styles['modal-img']}
        />
        <div className={styles['modal-button-container']}>
          <Button
            type="button"
            onClick={
              false
                ? modalIsId !== 0
                  ? () => {
                      // setMain(modalIsId);
                    }
                  : () => {
                      dispatch(addPopupOperation('Все ще головне'));
                    }
                : () => {
                    closeModalEditPhoto();
                  }
            }
          >
            {false
              ? modalIsId !== 0
                ? 'Встановити головним'
                : 'Головне'
              : 'Скасувати'}
          </Button>
          <Button
            type="button"
            onClick={
              false ? () => setPrompDelete(true) : () => delPhoto(modalIsId)
            }
          >
            {false ? 'Видалити фото' : 'Так'}
          </Button>
        </div>
      </div>
    </Modal>
  );

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.feedbackForm}>
        <Input
          className={styles.feedbackInput}
          label="Ім'я:"
          type="text"
          name="name"
          placeholder="Ваше імʼя"
          required={true}
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          className={styles.feedbackInput}
          label="Пошта:"
          type="email"
          name="email"
          placeholder="Ваш емейл"
          required={true}
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          className={styles.feedbackInput}
          label="Номер телефону:"
          type="tel"
          name="phone"
          placeholder="Ваш номер телефону у форматі 050-000-00-00"
          required={true}
          value={formData.phone}
          onChange={handleChange}
          // pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
        />
        <div style={{ marginTop: '16px' }}>
          <Textarea
            className={styles.feedbackTextarea}
            label="Коментар:"
            id="text"
            name="text"
            placeholder="Ваш коментар"
            value={formData.text}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles['add-image-container']}>
          {images}
          {inputPhotos()}    
          {modalIsOpen && modalWindow}
        </div>

        <Button type="submit" size="lg" style={{ marginTop: '32px' }}>
          Надіслати
        </Button>
      </form>

  

      {showThankYouModal && thankYouModalContent}
    </>
  );
}

export default FeedbackForm;
