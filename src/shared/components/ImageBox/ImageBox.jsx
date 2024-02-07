import { useState, useEffect } from 'react';
import useScreenWidth from 'shared/hooks/useScreenWidth';

import styles from './ImageBox.module.scss';

export default function ImageBox({ images = [], className }) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [startX, setStartX] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const [miniGalleryWidth, setMiniGalleryWidth] = useState(0);
  const screenWidth = useScreenWidth();
  const [containerWidth, setContainerWidth] = useState(() => screenWidth - 32);
  const [maxOffset, setMaxOffset] = useState(0);

  useEffect(() => {
    if (images.length <= 0) {
      return;
    }

    setMiniGalleryWidth(images.length * (80 + 12) - 12);
  }, [images]);

  useEffect(() => {
    setContainerWidth(screenWidth - 32);
  }, [screenWidth]);

  useEffect(() => {
    setMaxOffset(miniGalleryWidth - containerWidth);
  }, [containerWidth, miniGalleryWidth]);

  const handleTouchStart = event => {
    setStartX(event.changedTouches[0].clientX);
  };

  const handleTouchEnd = event => {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;

    // (deltaX > 50 || deltaX < -50) && setOffsetX(deltaX);

    if (deltaX > 0) {
      // не реагуємо, якщо галерея в стартовому положені
      if (offsetX >= 0) {
        return;
      }

      deltaX > maxOffset
        ? setOffsetX(0)
        : setOffsetX(prevOffset => prevOffset + deltaX);
      //   setCurrentImgIdx(prevIdx => prevIdx + 1);
      console.log({
        move: 'Свайп вправо',
        startX,
        endX,
        deltaX,
        offsetX,
        miniGalleryWidth,
        screenWidth,
        containerWidth,
        maxOffset,
      });
    } else if (deltaX < 0) {
      // не реагуємо, якщо загальне відхилення вліво вже не менше максимально допустимого відхилення
      if (offsetX <= -maxOffset) {
        return;
      }

      deltaX < -maxOffset
        ? setOffsetX(-maxOffset)
        : setOffsetX(prevOffset => prevOffset - -deltaX);
      //   setCurrentImgIdx(prevIdx => prevIdx - 1);

      console.log({
        move: 'Свайп вліво',
        startX,
        endX,
        deltaX,
        miniGalleryWidth,
        offsetX,
        screenWidth,
        containerWidth,
        maxOffset,
      });
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
        style={{
          transform: `translateX(${offsetX}px)`,
          width: `${miniGalleryWidth}`,
        }}
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
      <div className={styles['marker-container']}>
        {images.map((_, idx) => {
          return (
            <div
              key={idx}
              className={`${styles['circle-marker']}  ${
                idx === currentImgIdx ? styles.active : ''
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
