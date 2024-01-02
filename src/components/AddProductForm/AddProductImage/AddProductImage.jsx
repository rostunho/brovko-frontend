import React, { useState, useEffect } from 'react';
import AddIconImage from 'shared/icons/AddIconImage';
import styles from './addProductImage.module.scss';
import Image from 'shared/components/Image';
import Modal from 'shared/components/Modal/Modal';
import Button from 'shared/components/Button';
import { addPopupOperation } from 'redux/popup/popupOperations';
import { useDispatch } from 'react-redux';

const AddProductImage = ({ pictures }) => {
  const dispatch = useDispatch();
  //   pictures = [
  //   "https://shkvarka.ua/wp-content/uploads/img_3484-scaled.jpg",
  //   "https://shkvarka.ua/wp-content/uploads/img_3483-scaled.jpg",
  //   "https://shkvarka.ua/wp-content/uploads/img_3477-scaled.jpg",
  //   "https://shkvarka.ua/wp-content/uploads/img_3468-scaled.jpg"
  // ]
  const { picture } = pictures;
  const pictureArray = Array.isArray(picture) ? picture : [];
  console.log(picture);

  console.log(pictureArray);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPictures, setSelectedPictures] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [prompEdit, setPrompEdit] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsImage, setModalIsImage] = useState(false);
  const [modalIsId, setModalIsId] = useState(false);
  const [prompDelete, setPrompDelete] = useState(false);

  useEffect(() => {
    setSelectedPictures(pictureArray.map((url, index) => ({ id: index, url })));
    console.log('update pic');
  }, [pictures]);

  const openModalEditPhoto = (id, url) => {
    console.log(id, url);
    setModalIsId(id);
    setModalIsImage(url);
    setModalIsOpen(true);
    console.log('open modal');
  };

  const closeModalEditPhoto = () => {
    setModalIsOpen(false);
    setPrompDelete(false);
  };

  // function moveElementToIndex(array, oldIndex, newIndex) {
  //   if (newIndex >= array.length) {
  //     let k = newIndex - array.length + 1;
  //     while (k--) {
  //       array.push(undefined);
  //     }
  //   }
  //   array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  //   return array;
  // }

  // const setMain = idMain => {
  //   setSelectedPictures(prevPictures => {
  //     // const updatedPictures = prevPictures.map((picture, index) => ({
  //     //   ...picture,
  //     //   id: idMain && index === idMain ? 0 : idMain > index ? index + 1 : index,
  //     // }));

  //     const updatedPictures = prevPictures.map((url, index) => ({
  //       id: idMain && index === idMain ? 0 : idMain > index ? index + 1 : index,
  //       url,
  //     }));

  //     const mainPicture = updatedPictures.splice(idMain, 1)[0];
  //     updatedPictures.unshift(mainPicture);
  //     return updatedPictures;
  //   });
  //   closeModalEditPhoto();
  //   console.log(`Set main foto ${idMain}`);
  //   dispatch(addPopupOperation('Фото встановлено головним'));
  // };

  const setMain = (idMain) => {
    setSelectedPictures((prevPictures) => {
      const updatedPicturesWithNewIds = prevPictures.map((picture, index) => ({
        ...picture,
        id: idMain && index === idMain ? 0 : idMain > index ? index + 1 : index,
      }));
  
      const uniquePictures = updatedPicturesWithNewIds.reduce((acc, picture) => {
        if (!acc.find((p) => p.id === picture.id)) {
          acc.push(picture);
        }
        return acc;
      }, []);
  
      const sortedPictures = [...uniquePictures];
      sortedPictures.sort((a, b) => a.id - b.id);
  
      return sortedPictures;
    });
  
    closeModalEditPhoto();
    console.log(`Set main foto ${idMain}`);
    dispatch(addPopupOperation('Фото встановлено головним'));
  };
 

  const delPhoto = id => {
    setSelectedPictures(prevPictures => {
      const updatedPictures = prevPictures.filter(picture => picture.id !== id)
        .map((picture, index) => ({ ...picture, id: index }));
      console.log(updatedPictures);
      return updatedPictures;
    });
    closeModalEditPhoto();
    console.log(`delete photo ${id}`);
    dispatch(addPopupOperation('Фото видалено'));
  };

  console.log(selectedPictures);

  const handleImageChange = (e, xFiles = 100) => {
    e.preventDefault();
    const files = Array.from(e.target.files);

    if (files.length > 0 && files.length <= xFiles) {
      setSelectedFiles(files);
      console.log(files);
      addImages(files);
    } else {
      console.log(`Можна завантажити не більше ${xFiles} файлів`);
      dispatch(
        addPopupOperation(`Можна завантажити не більше ${xFiles} файлів`)
      );
    }
    console.log(selectedFiles);
  };

  // const addImages = files => {
  //   if (!files.length) {
  //     return;
  //   }

  //   // const newImages = files
  //   //   .map((file, index) => {
  //   //     if (file instanceof Blob) {
  //   //       return {
  //   //         id: selectedPictures.length + index,

  //   //         // id: selectedPictures.length + selectedImages.length + index,
  //   //         url: URL.createObjectURL(file),
  //   //       };
  //   //     } else {
  //   //       console.error('Invalid file:', file);
  //   //       return null;
  //   //     }
  //   //   })
  //   //   .filter(Boolean);

  //   const newImages = files.map(file => URL.createObjectURL(file));

  //   console.log(newImages);
  //   // setSelectedImages([...selectedImages, ...newImages]);
  //   // setSelectedPictures([...selectedPictures, ...newImages]);

  //   setSelectedImages([
  //     ...selectedImages,
  //     ...files.map(file => URL.createObjectURL(file)),
  //   ]);
  //   setSelectedPictures([
  //     ...selectedPictures,
  //     ...files.map(file => URL.createObjectURL(file)),
  //   ]);

  //   dispatch(
  //     addPopupOperation(
  //       `Додано ${newImages.length} файл${
  //         newImages.length === 1 ? `` : newImages.length < 5 ? `и` : `ів`
  //       }`
  //     )
  //   );
  //   setSelectedFiles([]);
  // };

  const addImages = files => {
    if (!files.length) {
      return;
    }
  
    const newImages = files.map((file, index) => {
      if (file instanceof Blob) {
        return {
          id: selectedPictures.length + index,
          url: URL.createObjectURL(file),
        };
      } else if (typeof file === 'string' && file.startsWith('blob:')) {
        return {
          id: selectedPictures.length + index,
          url: file,
        };
      } else {
        console.error('Invalid file:', file);
        return null;
      }
    }).filter(Boolean);
  
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

  // const images =  selectedPictures.map((picture) => (
  //   <Image key={picture} src={picture} alt={`preview-${picture.id}`} className={styles.img} />
  // ))
  const resetPromp = () => setPrompDelete(false);
  console.log(pictures);

  return (
    <>
      <p>Фото товару</p>
      <div className={styles.container}>
        {/* {images} */}
        {selectedPictures.map(({ id, url }, index) => (
          <Button
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
          </Button>
        ))}
        <label className={styles.fileInputLabel}>
          <input
            className={styles.visuallyHidden}
            type="file"
            accept="image/jpeg, image/png"
            multiple
            onChange={e => handleImageChange(e)}
          />
          <AddIconImage />
          {}
        </label>
        <p className={styles.text}>
          {selectedFiles.length > 0 || selectedPictures.length > 0
            ? 'Додати ще'
            : 'Додати фото'}
        </p>
      </div>
      {modalIsOpen && (
        <Modal closeModal={closeModalEditPhoto}>
          <p className={styles.mainText}>
            {!prompDelete
              ? 'Редагування зображення'
              : 'Ти дійсно бажаєш видалити це фото?'}
          </p>
          <Image
            key={modalIsId}
            src={modalIsImage}
            alt={`preview-${modalIsId}`}
            className={styles.img}
          />
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
            onClick={
              !prompDelete
                ? () => setPrompDelete(true)
                : () => delPhoto(modalIsId)
            }
          >
            {!prompDelete ? 'Видалити фото' : 'Так'}
          </Button>
        </Modal>
      )}
    </>
  );
};

export default AddProductImage;
