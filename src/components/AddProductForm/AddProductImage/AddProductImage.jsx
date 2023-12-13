import AddIconImage from 'shared/icons/AddIconImage';

import styles from './addProductImage.module.scss';
import { useState } from 'react';
import Image from 'shared/components/Image';

const AddProductImage = ({pictures}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [prompEdit, setPrompEdit] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const onSubmitForm = e => {
    e.preventDefault();
    console.log('Selected Images:', selectedImages);
  };

  const handleImageChange = e => {
    e.preventDefault();
    setSelectedFiles(Array.from(e.target.files));

    // Додаємо нові обрані зображення до поточного масиву



    // setSelectedImages(prevImages => [...prevImages, ...files]);

    // Тут ви можете відправити обрані зображення на бекенд або виконати інші дії
    console.log('Selected Images:', selectedImages);
  };

  // const Images = () => {

  // }

  const addImages = () => {
    if (!selectedFiles) {
      return;
    }

    const newImages = {


      // id: Date.now(),
      // files: selectedFiles
    }

setSelectedImages([...selectedImages, newImages])

  }
console.log(pictures)

const images = pictures.map((picture) => (
  <Image src={picture} className={styles.img}/>
) )

  return (
    <>
      <p>Фото товару</p>
      <form onSubmit={onSubmitForm} className={styles.container}>
        {/* {selectedImages.length>0 &&  */}
        {images}
       
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
        <p className={styles.text}>{selectedImages.length>0 ? 'Додати ще' : 'Додати фото' }</p>
      </form>
    </>
  );
};

export default AddProductImage;
