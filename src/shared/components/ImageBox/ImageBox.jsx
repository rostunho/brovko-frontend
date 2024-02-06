import { useState } from 'react';

import styles from './ImageBox.module.scss';

export default function ImageBox({ images = [], className }) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  return (
    <div className={`${styles['box-container']} ${className ? className : ''}`}>
      <img
        src={images[currentImgIdx]}
        className={styles['large-image']}
        alt="Смаколик"
      />
      <div className={styles['mini-gallery']}>
        {images.map((image, idx) => {
          return (
            <img
              className={`${styles['small-image']} ${
                currentImgIdx === idx ? styles.active : 's'
              }`}
              src={image}
              alt="Смаколик"
              onClick={() => setCurrentImgIdx(idx)}
            />
          );
        })}
      </div>
    </div>
  );
}
