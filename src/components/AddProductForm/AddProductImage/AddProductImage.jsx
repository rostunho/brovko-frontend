import React, { useState, useEffect } from 'react';
import AddIconImage from 'shared/icons/AddIconImage';
import styles from './addProductImage.module.scss';
import Image from 'shared/components/Image';

const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].id !== arr2[i].id || arr1[i].url !== arr2[i].url) {
      return false;
    }
  }

  return true;
};

const AddProductImage = ({ pictures = [] }) => {

  pictures = [
    "https://shkvarka.ua/wp-content/uploads/img_3484-scaled.jpg",
    "https://shkvarka.ua/wp-content/uploads/img_3483-scaled.jpg",
    "https://shkvarka.ua/wp-content/uploads/img_3477-scaled.jpg",
    "https://shkvarka.ua/wp-content/uploads/img_3468-scaled.jpg"
  ]
  const pictureArray = Array.isArray(pictures) ? pictures : [];

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPictures, setSelectedPictures] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [prompEdit, setPrompEdit] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

 


  const handleImageChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  useEffect(() => {
    const newImages = selectedFiles.map((file, index) => {
      if (file instanceof Blob) {
        return {
          id: Date.now() + index,
          url: URL.createObjectURL(file),
        };
      } else {
        console.error("Invalid file:", file);
        return null;
      }
    }).filter(Boolean);

    const pictureImages = pictureArray.map((url, index) => ({ id: index, url }));

    if (!arraysAreEqual([...newImages, ...pictureImages], selectedImages)) {
      setSelectedImages([...newImages, ...pictureImages]);
    }

    setSelectedFiles([]);
  }, [selectedFiles, pictureArray, selectedImages]);

  // useEffect(() => {
  //   // When pictures prop changes, update selectedImages
  //   const newImages = pictureArray.map((url, index) => ({ id: index, url }));

  //   // Only update the state if newImages is different from selectedImages
  //   if (!arraysAreEqual(newImages, selectedImages)) {
  //     setSelectedImages(newImages);
  //   }
  // }, [pictureArray, selectedImages]);

 

  const addImages = () => {
    if (!selectedFiles.length) {
      return;
    }

    const newImages = selectedFiles.map((file, index) => {
      if (file instanceof Blob) {
        return {
          id: Date.now() + index,
          url: URL.createObjectURL(file),
        };
      } else {
        console.error("Invalid file:", file);
        return null;
      }
    }).filter(Boolean);

    setSelectedImages([...selectedImages, ...newImages]);
    setSelectedFiles([]);
  };

  return (
    <>
      <p>Фото товару</p>
      <div  className={styles.container}>
        {selectedImages.length > 0 &&
          selectedImages.map((image) => (
            <Image key={image.id} src={image.url} alt={`preview-${image.id}`} className={styles.img} />
          ))}
        <label className={styles.fileInputLabel}>
          <input
            className={styles.visuallyHidden}
            type="file"
            accept="image/jpeg, image/png"
            multiple
            onChange={(e) => handleImageChange(e)}
          />
          <AddIconImage />
        </label>
        <p className={styles.text}>
          {selectedImages.length > 0 ? 'Додати ще' : 'Додати фото'}
        </p>
        <button type="button" onClick={addImages}>
          Додати
        </button>
      </div>
    </>
  );
};

export default AddProductImage;