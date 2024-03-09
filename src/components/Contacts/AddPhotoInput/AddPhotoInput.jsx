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
  const [selectedImagesReview, setSelectedImagesReview] = useState([]);
  const [selectedPicturesReview, setSelectedPicturesReview] = useState([]);
  const [selectedFilesReview, setSelectedFilesReview] = useState([]);
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

  // const handleImageChange = (e, xFiles = 5 - selectedPicturesReview.length) => {
  //   e.preventDefault();
  //   const files = Array.from(e.target.files);

  //   if (files.length > 0 && files.length <= xFiles) {
  //     setSelectedFilesReview(files);
  //     addImages(files);
  //     setErrorTextQuantity(false);
  //   } else {
  //     dispatch(
  //       addPopupOperation(`Можна завантажити не більше ${xFiles} файлів`)
  //     );
  //     setErrorTextQuantity(`Ви обрали більше ніж ${xFiles} фото`);
  //   }
  // };

  const [order, setOrder] = useState([]);

  const handleImageChange = e => {
    const newImages = Array.from(e.target.files).map(file => {
      if (file.type.includes('image')) {
        const img = URL.createObjectURL(file);
        setSelectedImagesReview(prevImages => [...prevImages, img]);
        setSelectedPicturesReview(prevPictures => [...prevPictures, file]);
        setOrder(prevOrder => [...prevOrder, file.name]); // Додано тут
        return img;
      } else {
        console.error('Invalid file:', file);
        addPopupOperation(`Не правильний файл: ${file}`);
        return null;
      }
    })
    .filter(Boolean);
  
    setSelectedFilesReview([]);
  };

  const handleDragStart = (e, index) => {
    setDraggedImageIndex(index);
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = e => {
    e.preventDefault();
    





    
    const dragIndex = order.indexOf(e.dataTransfer.getData('image'));
    const hoverIndex = order.findIndex(
      (_, index) => document.elementsFromPoint(e.clientX, e.clientY).includes(
        images[index].ref.current
      )
    );
  
    if (dragIndex === hoverIndex) {
      return;
    }
  
    const dragImage = selectedPicturesReview[dragIndex];
    const newOrder = [...order];
    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, dragImage.name);
  
    setOrder(newOrder);
  };

  const handleDrop = (e, toIndex) => {
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
      e.preventDefault();
    }
  };

  // const handleTouchStart = (e, index) => {
  //   setDraggedImageIndex(index);
  //   const touch = e.touches[0];
  //   const initialX = touch.pageX - e.currentTarget.getBoundingClientRect().left;
  //   const initialY = touch.pageY - e.currentTarget.getBoundingClientRect().top;
  //   e.currentTarget.style.transition = 'none';
  //   e.currentTarget.style.transform = `translate(${initialX}px, ${initialY}px)`;
  //   console.log('handleTouchStart',index ,initialX, initialY)
  // };

  // const handleTouchMove = (e, index) => {
  //   if (draggedImageIndex !== index) return;
  //   const touch = e.touches[0];
  //   const currentX = touch.pageX - e.currentTarget.getBoundingClientRect().left;
  //   const currentY = touch.pageY - e.currentTarget.getBoundingClientRect().top;
  //   e.currentTarget.style.transform = `translate(${currentX}px, ${currentY}px)`;
  //   // console.log('handleTouchMove',index ,currentX, currentY)
  // };
  // const handleTouchEnd = (e, index) => {
  //   if (draggedImageIndex !== index) return;
  //   e.currentTarget.style.transition = '';
  //   e.currentTarget.style.transform = '';
  //   const touch = e.changedTouches[0];
  //   const newToIndex = Array.from(e.currentTarget.parentElement.children).indexOf(e.currentTarget);
  //   const touchPosition = { x: touch.pageX, y: touch.pageY };
  //   handleDrop(touchPosition, newToIndex);
  //   setDraggedImageIndex(null);
  //   console.log('handleTouchMove',index ,touchPosition, newToIndex)

  // };

  const [initialTouchX, setInitialTouchX] = useState(0);
  const [initialTouchY, setInitialTouchY] = useState(0);
  const [touchMovementX, setTouchMovementX] = useState(0);
  const [touchMovementY, setTouchMovementY] = useState(0);

  document.addEventListener('touchmove', function(event) {
    event.preventDefault()
    document.body.style.overflow = 'hidden'
    var touch = event.touches[0];
    var touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
    console.log('Element under finger:', touchedElement);
});

document.addEventListener( "touchend", function(){
  document.body.style.overflow = 'auto';
})

  const handleTouchStart = (e, index) => {
    setDraggedImageIndex(index);
    const touch = e.touches[0];
    setInitialTouchX(touch.pageX);
    setInitialTouchY(touch.pageY);
  };

  // const handleTouchMove = (e, index) => {
  //   if (draggedImageIndex !== index) return;
  //   const touch = e.touches[0];
  //   const movementX = touch.pageX - initialTouchX;
  //   const movementY = touch.pageY - initialTouchY;
  //   setTouchMovementX(movementX);
  //   setTouchMovementY(movementY);
  // };

  const handleTouchMove = (e, index) => {
    if (draggedImageIndex !== index) return;
    const touch = e.touches[0];
    const movementX = touch.pageX - initialTouchX;
    const movementY = touch.pageY - initialTouchY;
    setTouchMovementX(movementX);
    setTouchMovementY(movementY);
    // const draggedImage = e.currentTarget;
    // e.currentTarget.style.transform = `translate(${movementX}px, ${movementY}px)`;
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

  const handleTouchEnd = (e, index) => {
    const touch = e.changedTouches[0];
    console.log(e.currentTarget);
    const newToIndex = Array.from(
      e.currentTarget.parentElement.children
    ).indexOf(e.currentTarget);
    if (draggedImageIndex !== null && draggedImageIndex === newToIndex) {
      // If the dragged image is dropped back in its original position, update its position in the array
      const updatedPictures = [...selectedPicturesReview];
      const draggedPicture = updatedPictures[draggedImageIndex];
      updatedPictures.splice(draggedImageIndex, 1);
      updatedPictures.splice(newToIndex, 0, draggedPicture);
      const reorderedPictures = updatedPictures.map((picture, index) => ({
        ...picture,
        id: index,
      }));
      setSelectedPicturesReview(reorderedPictures);
    } else if (draggedImageIndex !== null && draggedImageIndex !== newToIndex) {
      // If the dragged image is dropped in a new position, update the array as before
      const updatedPictures = [...selectedPicturesReview];
      const draggedPicture = updatedPictures[draggedImageIndex];
      updatedPictures.splice(draggedImageIndex, 1);
      updatedPictures.splice(newToIndex, 0, draggedPicture);
      const reorderedPictures = updatedPictures.map((picture, index) => ({
        ...picture,
        id: index,
      }));
      setSelectedPicturesReview(reorderedPictures);
    }
    setTouchMovementX(0);
    setTouchMovementY(0);
    setDraggedImageIndex(null);
  };
  // const images = selectedPicturesReview.map(({ id, url }, index) => (
  //   <div
  //     key={id}
  //     className={styles['add-image-button']}
  //     draggable
  //     onDragStart={e => handleDragStart(e, index)}
  //     onDragOver={e => handleDragOver(e)}
  //     onDrop={e => handleDrop(e, index)}
  //   >
  //     <div
  //       onTouchStart={e => handleTouchStart(e, index)}
  //       onTouchMove={e => handleTouchMove(e, index)}
  //       onTouchEnd={e => handleTouchEnd(e, index)}
  //     >
  //       <Image
  //         key={id}
  //         src={url}
  //         alt={`preview-${index + 1}`}
  //         className={styles['add-image-img']}
  //       />
  //     </div>
  //   </div>
  // ));

  const images = selectedImagesReview.map((img, index) => (
    <Image
      key={order[index]} // Змінено тут
      src={img}
      alt={`preview-${order[index]}`}
      className={styles['add-image']}
      onDragStart={e => handleDragStart(e, order[index])}
      onDragOver={e => handleDragOver(e)}
      onDrop={e => handleDrop(e, order[index])}
    />
  ));


  // const images = selectedPicturesReview.map(({ id, url }, index) => (
  //   // <Button key={id} className={styles['add-image-button']} type="button">
  //     <Image
  //       key={id}
  //       id={id}
  //       src={url}
  //       alt={`preview-${index + 1}`}
  //       className={styles['add-image-img']}
  //       draggable
  //       onDragStart={e => handleDragStart(e, index)}
  //       onDragOver={e => handleDragOver(e)}
  //       onDrop={e => handleDrop(e, index)}
  //       onTouchStart={e => handleTouchStart(e, index)}
  //       onTouchMove={e => handleTouchMove(e, index)}
  //       onTouchEnd={e => handleTouchEnd(e, index)}
  //     />
  //   {/* </Button> */}
  // ));

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
      ref={dropArea}
    >
      {images}
      {inputPhotos()}
      {modalIsOpen && modalWindow}
    </div>
  );
};

export default AddPhotoInput;
