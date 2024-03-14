import { useEffect, useState } from 'react';
import styles from './addPhotoInput.module.scss';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { useDispatch } from 'react-redux';
import Button from 'shared/components/Button';
import Image from 'shared/components/Image';
import AddIconImage from 'shared/icons/AddIconImage';
import Modal from 'shared/components/Modal/Modal';
import { useRef } from 'react';
import TrashIcon from 'shared/icons/TrashIcon';

const AddPhotoInput = ({ files = [], setFiles }) => {
  const [selectedPicturesReview, setSelectedPicturesReview] = useState(
    (files = [])
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsImage, setModalIsImage] = useState(false);
  const [modalIsId, setModalIsId] = useState(false);
  const [prompDelete, setPrompDelete] = useState(true);
  const [errorTextQuantity, setErrorTextQuantity] = useState(false);
  const [draggedImageIndex, setDraggedImageIndex] = useState(null);
  const [initialTouchX, setInitialTouchX] = useState(null);
  const [initialTouchY, setInitialTouchY] = useState(null);
  const dropArea = useRef(null);
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
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        if (file.size > 10 * 1024 * 1024) {
          setErrorTextQuantity(
            `Файл ${file.name} занадто великий! Максимальний розмір: 10MB.`
          );
          return;
        }
      }
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
    setDraggedImageIndex(index);
    e.dataTransfer.setData('text/plain', index);
   };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = (e, toIndex) => {
    e.preventDefault();
    if (
      typeof toIndex === 'number' &&
      draggedImageIndex !== null &&
      draggedImageIndex !== toIndex
    ) {
      const draggedPicture = selectedPicturesReview[draggedImageIndex];
      const updatedPictures = [...selectedPicturesReview];
      updatedPictures.splice(draggedImageIndex, 1);
      updatedPictures.splice(toIndex, 0, draggedPicture);
      const reorderedPictures = updatedPictures.map((picture, index) => ({
        ...picture,
        id: index,
      }));
      setSelectedPicturesReview(reorderedPictures);
      console.log('handleDrop', reorderedPictures);
    }
    setDraggedImageIndex(null);
  };

  const addImageStyles = (e, offsetX, offsetY) => {
    e.currentTarget.style.transform = `translate(${offsetX * 2}px, ${
      offsetY * 2
    }px)`;
    e.currentTarget.style.zIndex = '9999';
    e.currentTarget.style.cursor = 'move';
    e.currentTarget.style.scale = 0.5;
  };

  const handleTouchStart = (e, index) => {
    if (index !== draggedImageIndex) {
      setDraggedImageIndex(index);
      const touch = e.touches[0];
      setInitialTouchX(touch.clientX);
      setInitialTouchY(touch.clientY);
    }
  };
  console.log('draggedImageIndex', draggedImageIndex);

  const handleTouchMove = (e, index) => {
    if (draggedImageIndex !== null) {
      document.body.style.overflow = 'hidden';

     
      handleImageMove(e, index);

    }
  };

  const resetImageStyles = e => {
    document.body.style.overflow = 'auto';
    e.currentTarget.style.pointerEvents = '';
    e.currentTarget.style.display = '';
    e.currentTarget.style.transform = `translate(0px, 0px)`;
    e.currentTarget.style.scale = '';
    e.currentTarget.style.zIndex = '';
    e.currentTarget.style.opacity = 1;
  };

  const handleImageMove = (e, index) => {
    if (draggedImageIndex !== null && draggedImageIndex === index) {
      const touch = e.changedTouches[0];
      const offsetX = touch.clientX - initialTouchX;
      const offsetY = touch.clientY - initialTouchY;
      e.currentTarget.style.transform = `translate(${offsetX * 2}px, ${
        offsetY * 2
      }px)`;
      e.currentTarget.style.zIndex = '9999';
      e.currentTarget.style.cursor = 'move';
      e.currentTarget.style.scale = 0.5;
      e.currentTarget.style.opacity = 0.5;
    }
  };

  const handleTouchEnd = (e, index) => {
    if (!e.currentTarget) {
      console.error('Елемент не був знайдений');
      return;
    }
    e.currentTarget.style.pointerEvents = 'none';
     const touchedElement = document.elementFromPoint(
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    );

    const galleryRect = dropArea.current.getBoundingClientRect();
    const isTouchInsideGallery =
      e.changedTouches[0].clientX >= galleryRect.left &&
      e.changedTouches[0].clientX <= galleryRect.right &&
      e.changedTouches[0].clientY >= galleryRect.top &&
      e.changedTouches[0].clientY <= galleryRect.bottom;

    if (!isTouchInsideGallery) {
      resetImageStyles(e);
      setDraggedImageIndex(null);
      return;
    }

    if (!touchedElement.id) {
      resetImageStyles(e);
      setDraggedImageIndex(null);
      return;
    }

    const touchedIndex = parseInt(touchedElement.id);

    if (!isNaN(touchedIndex)) {
      if (draggedImageIndex !== null && draggedImageIndex !== touchedIndex) {
        const draggedPicture = selectedPicturesReview[draggedImageIndex];
        const updatedPictures = [...selectedPicturesReview];
        updatedPictures.splice(draggedImageIndex, 1);
        updatedPictures.splice(touchedIndex, 0, draggedPicture);
        const reorderedPictures = updatedPictures.map((picture, index) => ({
          ...picture,
          id: index,
        }));

        setSelectedPicturesReview(reorderedPictures);
      }
    }
    resetImageStyles(e);
    setDraggedImageIndex(null);
  };

  

  const images = selectedPicturesReview.map(({ id, url }, index) => (
    <Button
      key={index}
      id={id}
      className={styles['add-image-button']}
      type="button"
      draggable
      onDragStart={e => handleDragStart(e, index)}
      onDrop={e => handleDrop(e, index)}
      onTouchStart={e => handleTouchStart(e, index)}
      onTouchMove={e => handleTouchMove(e, index)}
      onTouchEnd={e => handleTouchEnd(e, index)}
      onClick={e => {
        openModalEditPhoto(index, url);
      }}
    >
      <Image
        key={id}
        id={id}
        src={url}
        alt={`preview-${index + 1}`}
        className={styles['add-image-img']}
        // ref={ref => (imagesRef.current[index] = ref)}
      />
      {!draggedImageIndex && (
        <div
          type="button"
          key={index + 'trash'}
          className={styles['deleteIcon']}
          onClick={e => {
            setPrompDelete(true);
            openModalEditPhoto(index, url);
          }}
        >
          <TrashIcon className={styles['trash']} />
        </div>
      )}
    </Button>
  ));

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

    setSelectedPicturesReview(prevPictures => [...prevPictures, ...newImages]);
    dispatch(
      addPopupOperation(
        `Додано ${newImages.length} файл${
          newImages.length === 1 ? '' : newImages.length < 5 ? 'и' : 'ів'
        }`
      )
    );
  };

  useEffect(() => {
    setFiles(selectedPicturesReview);
  }, [selectedPicturesReview]);

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
      id={modalIsId}
      url={modalIsImage}
    >
      <div className={styles['modal']}>
        <p className={styles['main-text']}>
          {false ? 'Видалення зобраення' : 'Ти дійсно бажаєш видалити це фото?'}
        </p>
        <Image
          key={modalIsId}
          id={modalIsId}
          src={modalIsImage}
          alt={`preview-${modalIsId}`}
          className={styles['modal-img']}
        />
        <div className={styles['modal-button-container']}>
          <Button
            type="button"
            onClick={
              !prompDelete
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
            {!prompDelete
              ? modalIsId !== 0
                ? 'Встановити головним'
                : 'Головне'
              : 'Скасувати'}
          </Button>
          <Button
            type="button"
            onClick={
              !prompDelete
                ? () => setPrompDelete(true)
                : () => delPhoto(modalIsId)
            }
          >
            {!prompDelete ? 'Видалити фото' : 'Так'}
          </Button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div
      className={styles['add-image-container']}
      onDragOver={e => handleDragOver(e)}
      ref={dropArea}
    >
      {images}
      {inputPhotos()}
      {modalIsOpen && modalWindow}

      {selectedPicturesReview.length < 5 && (
        <>
          <p
            className={`${styles['titleText']} ${
              errorTextQuantity ? styles['errorTextQuantity'] : ''
            }`}
          >
            {errorTextQuantity ||
              `Ви можете додавати до ${
                5 - selectedPicturesReview.length
              } фото у форматі .jpg, .jpeg, .png. Кожен файл не може перевищувати 10 Мб.`}
          </p>
        </>
      )}
    </div>
  );
};

export default AddPhotoInput;
