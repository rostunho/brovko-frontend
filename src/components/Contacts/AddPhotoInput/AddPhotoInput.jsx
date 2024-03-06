import { useEffect, useState } from 'react';
import styles from './addPhotoInput.module.scss';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { useDispatch } from 'react-redux';
import Button from 'shared/components/Button';
import Image from 'shared/components/Image';
import AddIconImage from 'shared/icons/AddIconImage';
import Modal from 'shared/components/Modal/Modal';

const AddPhotoInput = ({ files, setFiles }) => {
  const [selectedPicturesReview, setSelectedPicturesReview] = useState([]);
  const [selectedFilesReview, setSelectedFilesReview] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsImage, setModalIsImage] = useState(false);
  const [modalIsId, setModalIsId] = useState(false);
  const [prompDelete, setPrompDelete] = useState(true);
  const [errorTextQuantity, setErrorTextQuantity] = useState(false);
  const dispatch = useDispatch();
  const [draggedImageId, setDraggedImageId] = useState('null');

const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

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
    // e.preventDefault();
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
        setDraggedIndex(index);

  };

  const handleTouchStart = index => {
    console.log('touchstart ', index);
    setDraggedImageId(index);
  };

  const handleDragOver = e => {
    e.preventDefault();
     const newIndex = e.target.id;
    setDraggedOverIndex(newIndex);
  };

  const handleTouchMove = (event, index) => {
    // event.preventDefault();
    event.stopPropagation();
    const touch = event.changedTouches[0];
    const rect = event.currentTarget.getBoundingClientRect();
    const x = touch.pageX - rect.left;
    const y = touch.pageY - rect.top;
    const toIndex = Math.floor((x / rect.width) * updatedImages.length);
    console.log(
      'handleTouchMove_touch',
      touch,
      'index',
      index,
      'toIndex',
      toIndex
    );
    setOffset({ x, y });
  };

  // const handleTouchMove = (event, index) => {
  //   // event.preventDefault();
  //   event.stopPropagation();
  //   const touch = event.changedTouches[0];
  //   console.log('handleTouchMove_touch', touch, 'index', index);
  //   // return event => {
  //   //   // event.preventDefault();
  //   //   // event.stopPropagation();
  //   //   const touch = event.targetTouches[0];
  //   //   console.log('handleTouchMovetouch', touch);
  //   //   // const newX = touch.clientX - touchStartPos.offsetX;
  //   //   // const newY = touch.clientY - touchStartPos.offsetY;
  //   //   // event.target.style.transform = `translate(${newX}px, ${newY}px)`;
  //   // };
  // };

  const handleTouchEnd = (event, toIndex) => {
    console.log('start handleTouchEnd');

    if (draggedImageId !== null && selectedPicturesReview.length > 0) {
      const releasedImage = selectedPicturesReview[draggedImageId];
      const updatedPictures = [...selectedPicturesReview];
      const fromIndex = updatedPictures.findIndex(
        picture => picture.id === draggedImageId
      );
      updatedPictures.splice(toIndex, 0, releasedImage);
      updatedPictures.splice(fromIndex + 1, 1);
      setSelectedPicturesReview(updatedPictures);
      setDraggedImageId(null);
    }
  };

  // const handleTouchEnd = () => {
  //   console.log('start handleTouchEnd');

  //   if (draggedImageId !== null && selectedPicturesReview.length > 0) {
  //     const releasedImage = selectedPicturesReview[draggedImageId];
  //     setDraggedImageId(null);

  //     console.log(releasedImage);
  //     // Do something with the released image, e.g. move it to its new position
  //   }
  // };

  // const handleTouchEnd = (event, index) => {
  //   console.log('touchstend', index);

  //   event.preventDefault();
  //   event.stopPropagation();
  //   const touch = event.changedTouches[0];
  //   console.log('touchstend_touch', touch, 'index', index);
  //   // const newIndex = calculateNewIndex(touch.clientX, touch.clientY);
  //   // Реалізуйте логіку переміщення елементів масиву
  //   // Приблизно так: видалити елемент зі старої позиції, вставити його в нову
  //   // Ви можете використати функцію handleDrop для цього
  //   // Наприклад:
  //   // handleDrop(event, newIndex)
  //   // event.target.style.transform = 'none'; // Скидання трансформації
  // };

  // const handleTouchEnd = event => {
  //   console.log('start handleTouchEnd');

  //   const touch = event.changedTouches[0];
  //   if (draggedImageId !== null && selectedPicturesReview.length > 0) {
  //     const releasedImage = selectedPicturesReview.find(img => {
  //       if (!img.current) {
  //         return false;
  //       }
  //       const rect = img.current.getBoundingClientRect();
  //       return (
  //         touch.pageX >= rect.left &&
  //         touch.pageX <= rect.right &&
  //         touch.pageY >= rect.top &&
  //         touch.pageY <= rect.bottom
  //       );
  //     });
  //     // if (releasedImage) {
  //       console.log(releasedImage);
  //       // setDraggedImageId(null);
  //       // Do something with the released image, e.g. move it to its new position
  //     // }
  //   }
  // };

  // const handleTouchEnd = (event) => {
  //   const touch = event.changedTouches[0];
  //   const imageId = selectedPicturesReview.find(img => {
  //     const rect = img.current.getBoundingClientRect();
  //     return (
  //       touch.pageX >= rect.left &&
  //       touch.pageX <= rect.right &&
  //       touch.pageY >= rect.top &&
  //       touch.pageY <= rect.bottom
  //     );
  //   }).id;
  //   console.log(imageId);
  //   // setDraggedImageId(null);
  //   // Do something with the released image, e.g. move it to its new position
  // };

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

    setSelectedPicturesReview(prevPictures => [...prevPictures, ...newImages]);
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
      id={index}
      className={styles['add-image-button']}
      type="button"
      draggable
      onDragStart={e => handleDragStart(e, index)}
      onDrop={e => handleDrop(e, index)}
      onTouchStart={e => handleTouchStart(index)}
      onTouchEnd={event => handleTouchEnd(event, index)}
      onTouchMove={e => handleTouchMove(e)}
      onClick={e => {
        openModalEditPhoto(index, url);
      }}
      style={{
        order: draggedIndex === index || draggedOverIndex === index ? 1 : 0,
        zIndex: draggedIndex === index || draggedOverIndex === index ? 1000 : 0,
      }}
    >
      <Image
        key={id}
        id={index}
        src={url}
        alt={`preview-${index + 1}`}
        className={styles['add-image-img']}
      />
    </Button>
  ));

  useEffect(() => {
    setFiles(selectedPicturesReview);
  }, [selectedPicturesReview]);

  const inputPhoto = index => (
    <label
      htmlFor="file-input"
      className={styles['file-input-label']}
      key={index}
    >
      <input
        id="file-input"
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
    <div
      className={styles['add-image-container']}
      onDragOver={e => handleDragOver(e)}
    >
      {images}
      {inputPhotos()}
      {modalIsOpen && modalWindow}
    </div>
  );
};

export default AddPhotoInput;
