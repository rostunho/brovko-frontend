import { useState, useEffect } from 'react';

import imgArray from './imgArray';
import Image from 'shared/components/Image';
import Heading from 'shared/components/Heading';

import styles from './Swiper.module.scss';

const Swiper = () => {
  const [currentIdx, setCurrentIdx] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const [startX, setStartX] = useState(null);

  const handleTouchStart = e => {
    setStartX(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = e => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;
    if (deltaX > 50) {
      setCurrentIdx(currentIdx === 1 ? imgArray.length - 1 : currentIdx - 1);
    } else if (deltaX < -50) {
      setCurrentIdx(currentIdx === imgArray.length - 1 ? 0 : currentIdx + 1);
    }
  };

  let timeOut = null;

  useEffect(() => {
    timeOut =
      // eslint-disable-next-line react-hooks/exhaustive-deps
      autoplay &&
      setTimeout(() => {
        setCurrentIdx(currentIdx === imgArray.length - 1 ? 0 : currentIdx + 1);
      }, 2000);
  });

  return (
    <div
      className={styles.swiper}
      onMouseEnter={() => {
        clearTimeout(timeOut);
        setAutoplay(false);
      }}
      onMouseLeave={() => {
        setAutoplay(true);
      }}
      onTouchStart={e => {
        clearTimeout(timeOut);
        setAutoplay(false);
        handleTouchStart(e);
      }}
      onTouchEnd={e => {
        setAutoplay(true);
        handleTouchEnd(e);
      }}
    >
      <Heading>Шість крутих смаків!</Heading>
      <div className={styles.slidesContainer}>
        <div
          className={styles.visibleImages}
          style={{ transform: `translate(-${currentIdx * 100}%)` }}
        >
          {imgArray.map((item, idx) => {
            return (
              <Image
                key={idx}
                src={item.url}
                className={
                  idx === currentIdx
                    ? styles.currentImgContainer
                    : styles.sideImgContainer
                }
              />
            );
          })}
        </div>
      </div>
      <div className={styles.dotsContainer}>
        {imgArray.map((_, idx) => {
          return (
            <div
              key={idx}
              className={idx === currentIdx ? styles.activeDot : styles.dot}
              onClick={() => {
                setCurrentIdx(idx);
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Swiper;

/* <div className={styles.prewImgContainer}>
          {currentIdx - 1 >= 0 && (
            <Image src={`${imgArray[currentIdx - 1].url}`} />
          )}
        </div>
        <div className={styles.currentImgContainer}>
          <Image src={`${imgArray[currentIdx].url}`} />
        </div>
        <div className={styles.nextImgContainer}>
          {currentIdx + 1 <= imgArray.length - 1 && (
            <Image src={`${imgArray[currentIdx + 1].url}`} />
          )}
        </div> */
