import { useEffect, useState } from 'react';
import styles from './addPhotoInput.module.scss';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { useDispatch } from 'react-redux';
import Button from 'shared/components/Button';
import Image from 'shared/components/Image';
import AddIconImage from 'shared/icons/AddIconImage';
import Modal from 'shared/components/Modal/Modal';
import { useRef } from 'react';

const AddPhotoInput = ({ files = [], setFiles }) => {
  const [selectedPicturesReview, setSelectedPicturesReview] = useState(
    (files = [])
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsImage, setModalIsImage] = useState(false);
  const [modalIsId, setModalIsId] = useState(false);
  const [prompDelete, setPrompDelete] = useState(true);
  const [errorTextQuantity, setErrorTextQuantity] = useState(false);
  const dropArea = useRef(null);
  const dispatch = useDispatch();

  const [draggedImageIndex, setDraggedImageIndex] = useState(null);

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

  const [initialTouchX, setInitialTouchX] = useState(null);
  const [initialTouchY, setInitialTouchY] = useState(null);
  // const imagesRef = useRef([]);

  const handleTouchStart = (e, index) => {
    setDraggedImageIndex(index);
    const touch = e.touches[0];
    setInitialTouchX(touch.clientX);
    setInitialTouchY(touch.clientY);
    e.currentTarget.classList.add(styles['dragged-image']);
  };

  const handleTouchMove = (e, index) => {
    if (draggedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
      const touch = e.changedTouches[0];
      const offsetX = touch.clientX - initialTouchX;
      const offsetY = touch.clientY - initialTouchY;

      e.currentTarget.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      e.currentTarget.style.zIndex = '9999';
      e.currentTarget.style.cursor = 'move';
    }
  };

  const handleTouchEnd = (e, index) => {
    console.log(e.currentTarget.style);
    e.currentTarget.style.display = 'none';
    e.currentTarget.style.zIndex = '';
    e.currentTarget.style.cursor = '';

    const touch = e.changedTouches[0];
    var touchedElement = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    );
    if (!touchedElement) {
      document.body.style.overflow = 'auto';
      e.currentTarget.style.display = '';
      e.currentTarget.style.transform = `translate(0px, 0px)`;
      e.currentTarget.classList.remove(styles['dragged-image']);
      return;
    }
    console.log(touchedElement);
    // if (null && !touchedElement.id) return;
    const toIndex = selectedPicturesReview.findIndex(
      picture => Number(picture.id) === Number(touchedElement.id)
    );
console.log(toIndex);
    if (toIndex === -1) {
      document.body.style.overflow = 'auto';
      e.currentTarget.style.display = '';
      e.currentTarget.style.transform = `translate(0px, 0px)`;
      e.currentTarget.classList.remove(styles['dragged-image']);
      return;
    }

    if (selectedPicturesReview.some(picture => picture.id === touchedElement.id)) {
      const adjustedIndex = Number(touchedElement.id) < draggedImageIndex ? toIndex : toIndex - 1;
      console.log(adjustedIndex);
      if (
        typeof adjustedIndex === 'number' &&
        draggedImageIndex !== null &&
        draggedImageIndex !== adjustedIndex
      ) {
        const draggedPicture = selectedPicturesReview[draggedImageIndex];
        const updatedPictures = [...selectedPicturesReview];
        updatedPictures.splice(draggedImageIndex, 1);
        updatedPictures.splice(adjustedIndex, 0, draggedPicture);
        const reorderedPictures = updatedPictures.map((picture, index) => ({
          ...picture,
          id: index,
        }));
        document.body.style.overflow = 'auto';
        e.currentTarget.style.display = '';
        e.currentTarget.style.transform = `translate(0px, 0px)`;
        e.currentTarget.classList.remove(styles['dragged-image']);
        setSelectedPicturesReview(reorderedPictures);
        setDraggedImageIndex(null);
      }
    }
};
    // const toIndex = selectedPicturesReview.findIndex(
    //   picture => Number(picture.id) === Number(touchedElement.id)
    // );
    // console.log(toIndex);
    // if (toIndex === -1) {
    //   document.body.style.overflow = 'auto';
    //   e.currentTarget.style.display = '';
    //   e.currentTarget.style.transform = `translate(0px, 0px)`;
    //   e.currentTarget.classList.remove(styles['dragged-image']);
    //   return;
    // }
    // if (selectedPicturesReview.includes(touchedElement.id)) {
    //   toIndex =
    //     Number(touchedElement.id) < draggedImageIndex ? toIndex : toIndex - 1;
    //   console.log(toIndex);
    // }
    // if (
    //   typeof toIndex === 'number' &&
    //   draggedImageIndex !== null &&
    //   draggedImageIndex !== toIndex
    // ) {
    //   const draggedPicture = selectedPicturesReview[draggedImageIndex];
    //   const updatedPictures = [...selectedPicturesReview];
    //   updatedPictures.splice(draggedImageIndex, 1);
    //   updatedPictures.splice(toIndex, 0, draggedPicture);
    //   const reorderedPictures = updatedPictures.map((picture, index) => ({
    //     ...picture,
    //     id: index,
    //   }));
    //   document.body.style.overflow = 'auto';
    //   e.currentTarget.style.display = '';
    //   e.currentTarget.style.transform = `translate(0px, 0px)`;
    //   e.currentTarget.classList.remove(styles['dragged-image']);
    //   setSelectedPicturesReview(reorderedPictures);
    //   setDraggedImageIndex(null);
    // }
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
        // ref={ref => (imagesRef.current[index] = ref)}
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
