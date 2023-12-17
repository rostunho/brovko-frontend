import AddIconImage from 'shared/icons/AddIconImage';

import styles from './addProductImage.module.scss';
import { useEffect, useState } from 'react';
import Image from 'shared/components/Image';
// import ImageSlider from 'components/ProductDetail/ImageSlider';

const AddProductImage = ({ pictures }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([null]);
  const [prompEdit, setPrompEdit] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const pictures = [
  //   "https://shkvarka.ua/wp-content/uploads/img_3484-scaled.jpg",
  //   "https://shkvarka.ua/wp-content/uploads/img_3483-scaled.jpg",
  //   "https://shkvarka.ua/wp-content/uploads/img_3477-scaled.jpg",
  //   "https://shkvarka.ua/wp-content/uploads/img_3468-scaled.jpg"
  // ]
  const onSubmitForm = e => {
    e.preventDefault();
    console.log('Selected Images:', selectedImages);
  };

  const handleImageChange = e => {
    e.preventDefault();
    const files = Array.from(e.target.files);

  if (files.length > 0) {
    setSelectedFiles(files);
    // addImages();
  }
    addImages();

    // Додаємо нові обрані зображення до поточного масиву

    // setSelectedImages(prevImages => [...prevImages, ...files]);

    // Тут ви можете відправити обрані зображення на бекенд або виконати інші дії
    console.log('Selected Images:', selectedImages);
  };

  const addImages = () => {
  if (!selectedFiles.length) {
    return;
  }

  const newImages = selectedFiles.map((file, index) => {
    // Check if the file is a valid Blob or File object
    if (file instanceof Blob) {
      return {
        id: selectedImages.length + index,
        url: URL.createObjectURL(file),
      };
    } else {
      // Handle the case where the file is not a Blob or File
      console.error("Invalid file:", file);
      return null; // or provide a default URL or handle accordingly
    }
  }).filter(Boolean); // Remove any null entries

  setSelectedImages([...selectedImages, ...newImages]);
  setSelectedFiles([]);
};
  // const Images = () => {

  // }
  // useEffect(() => {
  //   // When pictures prop changes, update selectedImages
  //   setSelectedImages(pictures.map((url, index) => ({ id: index, url })));
  // }, [pictures]);
  // const addImages = () => {
  //   if (!selectedFiles) {
  //     return;
  //   }

  // const newImages = {
  //     // id: Date.now(),
  //     // files: selectedFiles
  //   };

  //   setSelectedImages([...selectedImages, newImages]);
  // };
  // console.log(pictures);

  // const images = pictures.map(picture => (
  //   <Image src={picture} className={styles.img} key={picture} />
  // ));
  // console.log(images)
  return (
    <>
      <p>Фото товару</p>
      <form onSubmit={onSubmitForm} className={styles.container}>
        {selectedImages.length > 0 &&
          selectedImages.map(image => (
            <Image key={image.id} src={image.url} alt={`preview-${image.id}`}className={styles.img} />
          ))}
        {/* {selectedImages.length > 0 &&
         {selectedImages.map((image) => ( 
          <Image key={image.id} src={image.url} className={styles.img} }
    ))}} */}
        {/* // <ImageSlider picture={pictures} />  */}
        {/* {pictures !== undefined && <ImageSlider picture={pictures} />} */}
        {/* } */}

        <label className={styles.fileInputLabel}>
          <input
            className={styles.visuallyHidden}
            type={!prompEdit ? 'file' : 'button'}
            accept="image/jpeg, image/png"
            multiple
            onClick={
              prompEdit
                ? e => {
                    e.preventDefault();
                    // resetPromp();
                  }
                : undefined
            }
            onChange={handleImageChange}
          />
          <AddIconImage />
        </label>
        <p className={styles.text}>
          {selectedImages.length > 0 ? 'Додати ще' : 'Додати фото'}
        </p>
        <button type="button" onClick={addImages}>
          Додати
        </button>
      </form>
    </>
  );
};

export default AddProductImage;
