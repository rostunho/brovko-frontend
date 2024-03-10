import { useEffect, useState } from 'react';
import styles from './addPhotoInput.module.scss';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { useDispatch } from 'react-redux';
import Button from 'shared/components/Button';
import Image from 'shared/components/Image';
import AddIconImage from 'shared/icons/AddIconImage';
import Modal from 'shared/components/Modal/Modal';
import { useRef } from 'react';

const AddPhotoInput = ({ setFiles }) => {
  const [selectedPicturesReview, setSelectedPicturesReview] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsImage, setModalIsImage] = useState(false);
  const [modalIsId, setModalIsId] = useState(false);
  const [prompDelete, setPrompDelete] = useState(true);
  const [errorTextQuantity, setErrorTextQuantity] = useState(false);
  const dropArea = useRef(null);
  const dispatch = useDispatch();

  const [draggedImageIndex, setDraggedImageIndex] = useState(null);
  // const [toImageIndex, setToImageIndex] = useState(null);

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
      // setSelectedFilesReview(files);
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
  };

  const handleTouchStart = (e, index) => {
    setDraggedImageIndex(index);
    // const touch = e.touches[0];
    // setInitialTouchX(touch.pageX);
    // setInitialTouchY(touch.pageY);
    console.log('handleTouchStart', index);
  };

  const handleTouchMove = (e, index) => {
    // e.preventDefault()
  };

  const handleTouchEnd = (e, index) => {
    const touch = e.changedTouches[0];
    var touchedElement = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    );
    const toIndex = Number(touchedElement.id);

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
    }
  };

  // const handleTouchEnd = (e, index) => {
  //   if (draggedImageIndex !== index) return;
  //   const touch = e.changedTouches[0];
  //   const newToIndex = Array.from(e.currentTarget.parentElement.children).indexOf(e.currentTarget);
  //   const updatedPictures = [...selectedPicturesReview];
  //   const draggedPicture = updatedPictures[draggedImageIndex];
  //   updatedPictures.splice(draggedImageIndex, 1);
  //   updatedPictures.splice(newToIndex, 0, draggedPicture);
  //   const reorderedPictures = updatedPictures.map((picture, index) => ({
  //     ...picture,
  //     id: index,
  //   }));
  //   setSelectedPicturesReview(reorderedPictures);
  //   setTouchMovementX(0);
  //   setTouchMovementY(0);
  //   setDraggedImageIndex(null);
  // };

  // const handleTouchEnd = (e, index) => {
  //   if (draggedImageIndex !== index) return;
  //   const touch = e.changedTouches[0];
  //   const newToIndex = Array.from(e.currentTarget.parentElement.children).indexOf(e.currentTarget);
  //   const updatedPictures = [...selectedPicturesReview];
  //   const draggedPicture = updatedPictures[draggedImageIndex];
  //   updatedPictures.splice(draggedImageIndex, 1);
  //   updatedPictures.splice(newToIndex, 0, draggedPicture);
  //   const reorderedPictures = updatedPictures.map((picture, index) => ({
  //     ...picture,
  //     id: index,
  //   }));
  //   setSelectedPicturesReview(reorderedPictures);
  //   setTouchMovementX(0);
  //   setTouchMovementY(0);
  //   setDraggedImageIndex(null);
  //   handleDrop({ x: touch.pageX, y: touch.pageY }, newToIndex);
  // };

  // const handleTouchEnd = (e, index) => {
  //   const touch = e.changedTouches[0];
  //   console.log(e.currentTarget);
  //   const newToIndex = Array.from(
  //     e.currentTarget.parentElement.children
  //   ).indexOf(e.currentTarget);
  //   if (draggedImageIndex !== null && draggedImageIndex === newToIndex) {
  //     // If the dragged image is dropped back in its original position, update its position in the array
  //     const updatedPictures = [...selectedPicturesReview];
  //     const draggedPicture = updatedPictures[draggedImageIndex];
  //     updatedPictures.splice(draggedImageIndex, 1);
  //     updatedPictures.splice(newToIndex, 0, draggedPicture);
  //     const reorderedPictures = updatedPictures.map((picture, index) => ({
  //       ...picture,
  //       id: index,
  //     }));
  //     setSelectedPicturesReview(reorderedPictures);
  //   } else if (draggedImageIndex !== null && draggedImageIndex !== newToIndex) {
  //     // If the dragged image is dropped in a new position, update the array as before
  //     const updatedPictures = [...selectedPicturesReview];
  //     const draggedPicture = updatedPictures[draggedImageIndex];
  //     updatedPictures.splice(draggedImageIndex, 1);
  //     updatedPictures.splice(newToIndex, 0, draggedPicture);
  //     const reorderedPictures = updatedPictures.map((picture, index) => ({
  //       ...picture,
  //       id: index,
  //     }));
  //     setSelectedPicturesReview(reorderedPictures);
  //   }
  //   setTouchMovementX(0);
  //   setTouchMovementY(0);
  //   setDraggedImageIndex(null);
  // };

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
      />
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
      <div className={styles.modal}>
        <p className={styles['main-text']}>
          {false
            ? 'Видалення зображення'
            : 'Ти дійсно бажаєш видалити це фото?'}
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
    <div
      className={styles['add-image-container']}
      onDragOver={e => handleDragOver(e)}
      ref={dropArea}
    >
      {images}
      {inputPhotos()}
      {modalIsOpen && modalWindow}
    </div>
  );
};

export default AddPhotoInput;
