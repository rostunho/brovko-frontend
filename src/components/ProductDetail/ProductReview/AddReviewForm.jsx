import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAddReview } from 'redux/reviews/reviewsOperations';
import Button from 'shared/components/Button';
import StarEmptyBig from 'shared/icons/StarEmtyBig';
import PaperClip from 'shared/icons/PaperClip';
import styles from './AddRewiewForm.module.scss';
import { addPopupOperation } from 'redux/popup/popupOperations';
import Image from 'shared/components/Image';
import AddIconImage from 'shared/icons/AddIconImage';
import Modal from 'shared/components/Modal/Modal';

export default function AddReviewForm({ toggleReviewInput, closeReviewInput }) {
  const [text, setText] = useState('');
  const [errorAddReview, setErrorAddReview] = useState(null);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPictures, setSelectedPictures] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [prompEdit, setPrompEdit] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsImage, setModalIsImage] = useState(false);
  const [modalIsId, setModalIsId] = useState(false);
  const [prompDelete, setPrompDelete] = useState(true);
  const [errorTextQuantity, setErrorTextQuantity] = useState(false);

  const { productId } = useParams();
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
    setSelectedPictures(prevPictures => {
      const updatedPictures = prevPictures
        .filter(picture => picture.id !== id)
        .map((picture, index) => ({ ...picture, id: index }));
      return updatedPictures;
    });
    closeModalEditPhoto();
    dispatch(addPopupOperation('Фото видалено'));
  };

  const handleImageChange = (e, xFiles = 5 - selectedPictures.length) => {
    e.preventDefault();
    const files = Array.from(e.target.files);

    if (files.length > 0 && files.length <= xFiles) {
      setSelectedFiles(files);
      addImages(files);
      setErrorTextQuantity(false);
    } else {
      dispatch(
        addPopupOperation(`Можна завантажити не більше ${xFiles} файлів`)
      );
      setErrorTextQuantity(`Ви обрали більше ніж ${xFiles} фото`);
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
            file, // Додаємо оригінальний файл до об'єкта
            url: URL.createObjectURL(file),
          };
        } else if (typeof file === 'string' && file.startsWith('blob:')) {
          return {
            id: selectedPictures.length + index,
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
    </Button>
  ));

  const inputPhoto = index => (
    <label className={styles.fileInputLabel} key={index}>
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

  const inputPhotos = () => {
    const remainingInputs = Math.max(5 - selectedPictures.length, 0);
    const inputsPhoto = [];

    for (let index = 0; index < remainingInputs; index++) {
      const element = inputPhoto(index);
      inputsPhoto.push(element);
    }

    return inputsPhoto;
  };

  const modalWindow = (
    <Modal closeModal={closeModalEditPhoto}>
      <p className={styles.mainText}>
        {false ? 'Видалення зображення' : 'Ти дійсно бажаєш видалити це фото?'}
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
        onClick={false ? () => setPrompDelete(true) : () => delPhoto(modalIsId)}
      >
        {false ? 'Видалити фото' : 'Так'}
      </Button>
    </Modal>
  );

  const resetPromp = () => setPrompDelete(false);

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('text', text);
    console.log(selectedPictures);
    console.log(selectedFiles);
    selectedPictures.forEach(({file}) => {
      console.log(file);
      formData.append(`review`, file);
    });

    try {
      await dispatch(fetchAddReview(formData));

      setText('');
      setSelectedPictures([]);
      setSelectedFiles([]);
      closeReviewInput();
    } catch (error) {
      console.error('Error submitting review:', error);
      // setErrorAddReview('Не вдалося завантажити відгуки. Спробуйте знову пізніше.');
    }
  };

  return (
    <div className={styles.containerInputRewiew}>
      <Button mode="close" onClick={closeReviewInput} />
      <p className={styles.titleText}>Оцініть, будь ласка, смаколик</p>
      <div className={styles.starBlock}>
        <StarEmptyBig />
        <StarEmptyBig />
        <StarEmptyBig />
        <StarEmptyBig />
        <StarEmptyBig />
      </div>

      <p className={styles.titleText}>Коментар</p>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            className={styles.comment}
            placeholder="..."
            id="text"
            name="text"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
        </div>
        <div className={styles.addImg}>
        {/* <PaperClip /> */}
          {images}
          {inputPhotos()}
          {selectedPictures.length < 5 && (
            <>
            
              <p
                className={`${styles.titleText} ${
                  errorTextQuantity ? styles.errorTextQuantity : ''
                }`}
              >
                {errorTextQuantity ||
                  `Ви можете додавати до ${
                    5 - selectedPictures.length
                  } фото у форматі .jpg, .jpeg, .png. Кожен файл не може перевищувати 5 Мб.`}
              </p>
            </>
          )}
        </div>

        <Button
          className={styles.commentButton}
          type="submit"
          onClick={toggleReviewInput}
          mode="outlined"
        >
          Опублікувати
        </Button>
      </form>
      {modalIsOpen && modalWindow}
    </div>
  );
}
