import AddIconImage from 'shared/icons/AddIconImage';

import styles from './addProductImage.module.scss';
import { useState } from 'react';

const AddProductImage = () => {
    const [prompDelete, setPrompDelete] = useState(false);
    const onSubmitForm = e => {
    e.preventDefault();
  };
  return (
    <>
      <p>Фото товару</p>
      <form onSubmit={onSubmitForm} className={styles.buttonsContainer}>
        <label className={styles.fileInputLabel}>
          <input
            className={styles.visuallyHidden}
            type={!prompDelete ? 'file' : 'button'}
            accept="image/jpeg, image/png"
            onClick={
              prompDelete
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
      </form>
    </>
  );
};

export default AddProductImage;
