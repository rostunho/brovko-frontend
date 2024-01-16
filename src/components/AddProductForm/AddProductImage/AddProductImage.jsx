import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (picture.length > 0) {
      setSelectedPictures(
        pictureArray.map((url, index) => ({ id: index, url }))
      );
    }
  }, [picture]);

  const openModalEditPhoto = (id, url) => {
    console.log(id, url);
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
  console.log(selectedPictures);

  const images = selectedPictures.map(({ id, url }, index) => (
    <Button
      key={index}
      className={styles.btn}
      type="button"
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
      <TrashIcon className={styles.trash} />
    </Button>
  ));

  useEffect(() => {
    console.log(selectedPictures);
    setFiles(selectedPictures);
  }, [selectedPictures]);

  const inputPhoto = (
    <label className={styles.fileInputLabel}>
      <input
        className={styles.visuallyHidden}
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
           <div className={styles.modal}>
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
      <div className={styles.modalButtonContainer}>  <Button
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
          onClick={
            !prompDelete
              ? () => setPrompDelete(true)
              : () => delPhoto(modalIsId)
          }
        >
          {!prompDelete ? 'Видалити фото' : 'Так'}
        </Button></div>
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
        <div className={styles.imgContainer}>
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
