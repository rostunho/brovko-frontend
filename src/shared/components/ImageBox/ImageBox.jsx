import { useState } from 'react';

import styles from './ImageBox.module.scss';

export default function ImageBox({ images = [], className }) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [startX, setStartX] = useState(null);

  const handleTouchStart = event => {
    setStartX(event.changedTouches[0].clientX);
  };

  const handleTouchEnd = event => {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX > 50) {
      console.log('Свайп вправо');
    } else if (deltaX < -50) {
      console.log('Свайп вліво');
    }
  };

  return (
    <div className={`${styles['box-container']} ${className ? className : ''}`}>
      <img
        src={images[currentImgIdx]}
        className={styles['large-image']}
        alt="Смаколик"
      />
      <div
        className={styles['mini-gallery']}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, idx) => {
          return (
            <img
              key={idx}
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
