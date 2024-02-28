import { useEffect, useState } from 'react';
import styles from './addPhotoInput.module.scss';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { useDispatch } from 'react-redux';
import Button from 'shared/components/Button';
import Image from 'shared/components/Image';
import AddIconImage from 'shared/icons/AddIconImage';
import Modal from 'shared/components/Modal/Modal';

const AddPhotoInput = ({ setFiles }) => {
  const [selectedImagesReview, setSelectedImagesReview] = useState([]);
  const [selectedPicturesReview, setSelectedPicturesReview] = useState([]);
  const [selectedFilesReview, setSelectedFilesReview] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsImage, setModalIsImage] = useState(false);
  const [modalIsId, setModalIsId] = useState(false);
  const [prompDelete, setPrompDelete] = useState(true);
  const [errorTextQuantity, setErrorTextQuantity] = useState(false);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);




  const [state, setState] = useState([]);
  const [draggedImageId, setDraggedImageId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleTouchStart = (event, id) => {
    setDraggedImageId(id);
    const touch = event.touches[0];
    setOffset({ x: touch.pageX, y: touch.pageY });
  };

  const handleTouchMove = (event) => {
    if (!draggedImageId) {
      return;
    }
    event.preventDefault();
    const touch = event.touches[0];
    const deltaX = touch.pageX - offset.x;
    const deltaY = touch.pageY - offset.y;
    const updatedImages = [...state];
    const sourceIndex = updatedImages.findIndex((img) => img.id === draggedImageId);
    const targetIndex = updatedImages.findIndex(
      (img, index) =>
        img.id !== draggedImageId &&
        deltaX > -100 &&
        deltaX < 100 &&
        deltaY > -100 &&
        deltaY < 100 &&
        index > sourceIndex
    );
    if (targetIndex === -1) {
      return;
    }
    const temp = updatedImages[sourceIndex];
    updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(targetIndex, 0, temp);
    setSelectedPicturesReview(updatedImages);
    setOffset({ x: touch.pageX, y: touch.pageY });
  };

  const handleTouchEnd = () => {
    setDraggedImageId(null);
  };



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

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = (e, toIndex) => {
    e.preventDefault();
    const dataTransfer = e.dataTransfer;
    if (dataTransfer) {
      const fromIndex = parseInt(dataTransfer.getData('text/plain'), 10);
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
    }
  };
  // const [touchStartPos, setTouchStartPos] = useState(null);

  // const handleTouchStart = index => {
  //   return event => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     const touch = event.targetTouches[0];
  //     const offsetX = touch.clientX - event.target.getBoundingClientRect().left;
  //     const offsetY = touch.clientY - event.target.getBoundingClientRect().top;
  //     setTouchStartPos({ index, offsetX, offsetY });
  //   };
  // };

  // useEffect(() => {
  //   const input = document.getElementById(`input-${index}`);
  //   input.addEventListener('touchstart', handleTouchStart(index), { passive: false });

  //   return () => {
  //     input.removeEventListener('touchstart', handleTouchStart(index));
  //   };
  // }, []);

  // useEffect(() => {
  //   const input = document.getElementById(`input-${index}`);
  //   if (input) {
  //     const handleTouchStartWithIndex = handleTouchStart(index);
  //     input.addEventListener('touchstart', handleTouchStartWithIndex, {
  //       passive: false,
  //     });

  //     return () => {
  //       input.removeEventListener('touchstart', handleTouchStartWithIndex);
  //     };
  //   }
  // }, [index]);

  // useEffect(() => {
  //   const input = document.getElementById(`input-${index}`);
  //   const handleTouchStartWithIndex = handleTouchStart(index);
  //   input.addEventListener('touchstart', handleTouchStartWithIndex, { passive: false });
    
  //   return () => {
  //     input.removeEventListener('touchstart', handleTouchStartWithIndex);
  //   };
  // }, [index]);

  // const handleTouchMove = index => {
  //   return event => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     const touch = event.targetTouches[0];
  //     const newX = touch.clientX - touchStartPos.offsetX;
  //     const newY = touch.clientY - touchStartPos.offsetY;
  //     event.target.style.transform = `translate(${newX}px, ${newY}px)`;
  //   };
  // };

  // const handleTouchEnd = index => {
  //   return event => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     const touch = event.changedTouches[0];
  //     const newIndex = calculateNewIndex(touch.clientX, touch.clientY);
  //     // Реалізуйте логіку переміщення елементів масиву
  //     // Приблизно так: видалити елемент зі старої позиції, вставити його в нову
  //     // Ви можете використати функцію handleDrop для цього
  //     // Наприклад:
  //     handleDrop(event, newIndex);
  //     event.target.style.transform = 'none'; // Скидання трансформації
  //   };
  // };

  // const calculateNewIndex = (clientX, clientY) => {
  //   // Розрахунок нового індексу для переміщення елемента у масиві
  //   // Залежно від його позиції на екрані
  // };

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
      onTouchStart={(e) => handleTouchStart(e, index)}
      onTouchMove={handleTouchMove(index)}
      onTouchEnd={handleTouchEnd(index)}
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

  useEffect(() => {
    setFiles(selectedPicturesReview);
  }, [selectedPicturesReview]);

  const inputPhoto = index => {
    // const handleTouchStart = index => {
    //   return event => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     const touch = event.targetTouches[0];
    //     const offsetX = touch.clientX - event.target.getBoundingClientRect().left;
    //     const offsetY = touch.clientY - event.target.getBoundingClientRect().top;
    //     setTouchStartPos({ index, offsetX, offsetY });
    //   };
    // };

    return (
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
  };

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
      <div
        className={styles['add-image-container']}
        onDragOver={handleDragOver}
      >
        {images}
        {inputPhotos()}
      </div>
      {modalIsOpen && modalWindow}
    </>
  );
};

export default AddPhotoInput;
