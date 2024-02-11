import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPopupOperation } from 'redux/popup/popupOperations';
import Modal from 'shared/components/Modal/Modal';
import Button from 'shared/components/Button';
import Image from 'shared/components/Image';
import StarEmptyBig from 'shared/icons/StarEmtyBig';
import AddIconImage from 'shared/icons/AddIconImage';
import styles from './NewAddReviewForm.module.scss';

export default function NewAddReviewForm({ onClose, ...props }) {
  const [message, setMessage] = useState('');

  const [selectedImagesReview, setSelectedImagesReview] = useState([]);
  const [selectedPicturesReview, setSelectedPicturesReview] = useState([]);
  const [selectedFilesReview, setSelectedFilesReview] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsImage, setModalIsImage] = useState(false);
  const [modalIsId, setModalIsId] = useState(false);
  const [prompDelete, setPrompDelete] = useState(true);
  const [errorTextQuantity, setErrorTextQuantity] = useState(false);

  const dispatch = useDispatch();

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
    <Modal closeModal={closeModalEditPhoto}>
      <div className={styles.modal}>
        <p className={styles.mainText}>
          {false
            ? 'Видалення зображення'
            : 'Ти дійсно бажаєш видалити це фото?'}
        </p>
        <Image
          key={modalIsId}
          src={modalIsImage}
          alt={`preview-${modalIsId}`}
          className={styles.modalImg}
        />
        <div className={styles.modalButtonContainer}>
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
    <div className={styles.container}>
      <Button mode="close" onClick={onClose} />
      <p className={styles.prompt}>Оцініть, будь ласка, смаколик</p>
      {/* замінити на окремий компонент з логікою заповнення шкали рейтингу */}
      <div className={styles['star-block']}>
        <StarEmptyBig />
        <StarEmptyBig />
        <StarEmptyBig />
        <StarEmptyBig />
        <StarEmptyBig />
      </div>
      {/* */}
      <form>
        <label className={styles.label}>
          Коментар:
          <textarea
            className={styles.textarea}
            rows="6"
            onChange={e => setMessage(e.target.value)}
            required
          />
        </label>
        <div className={styles['add-image-container']}>
          {images}
          {inputPhotos()}
        </div>

        <Button type="submit" size="lg" className={styles['submit-button']}>
          Опублікувати
        </Button>
      </form>

      {modalIsOpen && modalWindow}
    </div>
  );
}
