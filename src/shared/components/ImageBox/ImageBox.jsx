import { useState } from 'react';

import styles from './ImageBox.module.scss';

export default function ImageBox({ images = [], className }) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [startX, setStartX] = useState(null);
  const [offsetX, setOffsetX] = useState(0);

  const handleTouchStart = event => {
    setStartX(event.changedTouches[0].clientX);
  };

  const handleTouchEnd = event => {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;

    // (deltaX > 50 || deltaX < -50) && setOffsetX(deltaX);

    if (deltaX > 50) {
      console.log('Свайп вправо');
      setOffsetX(prevOffset => prevOffset + 1);
      //   setCurrentImgIdx(prevIdx => prevIdx + 1);
    } else if (deltaX < -50) {
      console.log('Свайп вліво');
      setOffsetX(prevOffset => prevOffset - 1);
      //   setCurrentImgIdx(prevIdx => prevIdx - 1);
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
        style={{ transform: `translateX(${offsetX * 80 * 2}px)` }}
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
