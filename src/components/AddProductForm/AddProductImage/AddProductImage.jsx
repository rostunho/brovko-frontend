import React, { useState, useEffect, useRef } from 'react';
import AddIconImage from 'shared/icons/AddIconImage';
import styles from './addProductImage.module.scss';
import Image from 'shared/components/Image';
import Modal from 'shared/components/Modal/Modal';
import Button from 'shared/components/Button';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { useDispatch } from 'react-redux';
import TrashIcon from 'shared/icons/TrashIcon';

const AddProductImage = ({ pictures = [], setFiles }) => {
  const dispatch = useDispatch();
  const { picture = [] } = pictures;

  const pictureArray = Array.isArray(picture) ? picture : [];

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPictures, setSelectedPictures] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [prompEdit, setPrompEdit] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsImage, setModalIsImage] = useState(false);
  const [modalIsId, setModalIsId] = useState(false);
  const [prompDelete, setPrompDelete] = useState(false);
  const [draggedImageIndex, setDraggedImageIndex] = useState(null)

  const touchStartRef = useRef(null);

  useEffect(() => {
    if (picture.length > 0) {
      setSelectedPictures(
        pictureArray.map((url, index) => ({ id: index, url }))
      );
    }
  }, [picture]);

  const openModalEditPhoto = (id, url) => {
    setModalIsId(id);
    setModalIsImage(url);
    setModalIsOpen(true);
  };

  const closeModalEditPhoto = () => {
    setModalIsOpen(false);
    setPrompDelete(false);
  };

  const setMain = idMain => {
    setSelectedPictures(prevPictures => {
      const updatedPicturesWithNewIds = prevPictures.map((picture, index) => ({
        ...picture,
        id: idMain && index === idMain ? 0 : idMain > index ? index + 1 : index,
      }));

      const uniquePictures = updatedPicturesWithNewIds.reduce(
        (acc, picture) => {
          if (!acc.find(p => p.id === picture.id)) {
            acc.push(picture);
          }
          return acc;
        },
        []
      );

      const sortedPictures = [...uniquePictures];
      sortedPictures.sort((a, b) => a.id - b.id);

      return sortedPictures;
    });

    closeModalEditPhoto();
    dispatch(addPopupOperation('Фото встановлено головним'));
  };

  const delPhoto = id => {
    setSelectedPictures(prevPictures => {
      const updatedPictures = prevPictures
        .filter(picture => picture.id !== id)
        .map((picture, index) => ({ ...picture, id: index }));
      return updatedPictures;
    });
    closeModalEditPhoto();
    dispatch(addPopupOperation('Фото видалено'));
  };

  const handleImageChange = (e, xFiles = 100) => {
    e.preventDefault();
    const files = Array.from(e.target.files);

    if (files.length > 0 && files.length <= xFiles) {
      setSelectedFiles(files);
      addImages(files);
    } else {
      dispatch(
        addPopupOperation(`Можна завантажити не більше ${xFiles} файлів`)
      );
    }
  };

  const addImages = files => {
    if (!files.length) {
      return;
    }

    const newImages = files
      .map((file, index) => {
        if (file instanceof Blob) {
          return {
            id: selectedPictures.length + index,
            file,
            url: URL.createObjectURL(file),
          };
        } else if (typeof file === 'string' && file.startsWith('blob:')) {
          return {
            id: selectedPictures.length + index,
            file,
            url: file,
          };
        } else {
          console.error('Invalid file:', file);
          addPopupOperation(`Не правильний файл: ${file}`);
          return null;
        }
      })
      .filter(Boolean);

    setSelectedImages([...selectedImages, ...newImages]);
    setSelectedPictures([...selectedPictures, ...newImages]);
    dispatch(
      addPopupOperation(
        `Додано ${newImages.length} файл${
          newImages.length === 1 ? '' : newImages.length < 5 ? 'и' : 'ів'
        }`
      )
    );
    setSelectedFiles([]);
  };

  const resetPromp = () => setPrompDelete(false);

  useEffect(() => {
    const element = document.querySelector(`.${styles.imgContainer}`);
    if (element) {
      element.addEventListener(`${styles.btn}`, handleTouchMove, {
        passive: false,
      });

      return () => {
        element.removeEventListener(`'${styles.btn}'`, handleTouchMove);
      };
    }
  }, []);

  // const handleDragStart = (e, index) => {
  //   e.dataTransfer.setData('text/plain', index);
  // };

  // const handleDragOver = e => {
  //   e.preventDefault();
  // };

  // const handleDrop = (e, toIndex) => {
  //   e.preventDefault();
  //   const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
  //   const draggedPicture = selectedPictures[fromIndex];

  //   // Create a copy of the selectedPictures array
  //   const updatedPictures = [...selectedPictures];

  //   // Remove the picture from its original position
  //   updatedPictures.splice(fromIndex, 1);

  //   // Insert the picture at the new position
  //   updatedPictures.splice(toIndex, 0, draggedPicture);

  //   const reorderedPictures = updatedPictures.map((picture, index) => ({
  //     ...picture,
  //     id: index,
  //   }));
  //   setSelectedPictures(reorderedPictures);
  // };

  let startX, startY;

  const handleTouchStart = (e, index) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  };

  const handleTouchMove = e => {
    e.preventDefault();
    console.log('Touch move detected');
    if (!startX || !startY) {
      return;
    }
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    const deltaX = touchX - startX;
    const deltaY = touchY - startY;

    const container = e.target.closest(`.${styles.imgContainer}`);
    if (container) {
      container.style.tranform = `translate(${deltaX}px, ${deltaY}px)`;
    }
  };

  const onTouchMove = event => {
    // Call the handleTouchMove function
    handleTouchMove(event);
  };

  const handleTouchEnd = (e, index) => {
    startX = null;
    startY = null;

    // Find the container and calculate the new position
    const container = document.querySelector(`.${styles.imgContainer}`);
    const rect = container.getBoundingClientRect();
    const containerX = rect.left;
    const containerY = rect.top;
    const containerWidth = rect.width;
    const containerHeight = rect.height;

    const touch = e.changedTouches[0];
    const touchX = touch.clientX - containerX;
    const touchY = touch.clientY - containerY;

    // Determine if the touch was inside the container
    const isTouchInside =
      touchX >= 0 &&
      touchX <= containerWidth &&
      touchY >= 0 &&
      touchY <= containerHeight;

    // If the touch was inside the container, update
    e.target.releasePointerCapture(e.touches[0].identifier);
  };

  const images = selectedPictures.map(({ id, url }, index) => (
    <Button
      key={index}
      className={styles.btn}
      type="button"
      ariaLabel="Відкрити зображення для перегляду"
      draggable
      // onDragStart={e => handleDragStart(e, index)}
      // onDrop={e => handleDrop(e, index)}
      onTouchStart={e => handleTouchStart(e, index)}
      onTouchMove={e => handleTouchMove(e, index)}
      onTouchEnd={e => handleTouchEnd(e, index)}
      onClick={e => {
        openModalEditPhoto(index, url);
      }}
    >
      <Image
        key={index}
        src={url}
        alt={`preview-${index + 1}`}
        className={styles.img}
      />
      <a
        // type="button"
        aria-label="Видалити фото"
        key={index + 'trash'}
        className={styles.deleteIcon}
        onClick={e => {
          e.stopPropagation();
          setPrompDelete(true);
          openModalEditPhoto(index, url);
        }}
      >
        <TrashIcon className={styles.trash} />
      </a>
    </Button>
  ));

  useEffect(() => {
    setFiles(selectedPictures);
  }, [selectedPictures]);

  const inputPhoto = (
    <label className={styles.fileInputLabel}>
      <input
        className={styles.visuallyHidden}
        aria-label="Завантажте картинки сюди"
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        multiple
        onChange={e => handleImageChange(e)}
      />
      <AddIconImage />
    </label>
  );

  const modalWindow = (
    <Modal closeModal={closeModalEditPhoto}>
      <div
        className={styles.modal}
        aria-label={
          !prompDelete
            ? 'Редагування зображення'
            : 'Ти дійсно бажаєш видалити це фото?'
        }
      >
        <p className={styles.mainText}>
          {!prompDelete
            ? 'Редагування зображення'
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
              !prompDelete
                ? modalIsId !== 0
                  ? () => {
                      setMain(modalIsId);
                    }
                  : () => {
                      dispatch(addPopupOperation('Все ще головне'));
                    }
                : () => resetPromp()
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
            ariaLabel={!prompDelete ? 'Видалити фото' : 'Так'}
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
    <>
      <p>Фото товару</p>
      <div className={styles.container}>
        <p className={styles.text}>
          {selectedFiles.length > 0 || selectedPictures.length > 0
            ? 'Перше фото буде головним в картці товару. Перетягни, щоб змінити порядок фото.'
            : 'У суперадміна є суперздібність! Ти можеш додавати необмежену кількість фотографій товару!'}{' '}
        </p>
        <div
          className={styles.imgContainer}
          // onDragOver={handleDragOver}
          // onTouchStart={handleTouchStart}
          // onTouchMove={handleTouchMove}
          onTouchStart={event => {
            touchStartRef.current = event.touches[0].clientX;
          }}
          onTouchMove={onTouchMove}
          // onTouchEnd={e => handleTouchEnd(e)}
        >
          {images}
          {inputPhoto}
        </div>
        <p className={styles.text}>
          {selectedFiles.length > 0 || selectedPictures.length > 0
            ? 'Додати ще'
            : 'Додати фото'}
        </p>
      </div>
      {modalIsOpen && modalWindow}
    </>
  );
};

export default AddProductImage;
