import AddIconImage from 'shared/icons/AddIconImage';

import styles from './addProductImage.module.scss';
import { useState } from 'react';

const AddProductImage = () => {
    const [prompEdit, setPrompEdit] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const onSubmitForm = e => {
    e.preventDefault();
  };
  return (
    <>
      <p>Фото товару</p>
      <form onSubmit={onSubmitForm} className={styles.container}>
        <label className={styles.fileInputLabel}>
          <input
            className={styles.visuallyHidden}
            type={!prompEdit ? 'file' : 'button'}
            accept="image/jpeg, image/png"
            onClick={
              prompEdit
                ? e => {
                    e.preventDefault();
                    // resetPromp();
                  }
                : undefined
            }
            onChange={e => {
              e.preventDefault();
            //   addImage(e);
            }}
          />
          <AddIconImage />
         
        </label>
        <p className={styles.text}>Додати фото</p>
      </form>
    </>
  );
};

export default AddProductImage;
