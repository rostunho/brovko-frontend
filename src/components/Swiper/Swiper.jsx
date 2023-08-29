import { useState } from 'react';

import imgArray from './imgArray';
import Image from 'shared/components/Image';
import Heading from 'shared/components/Heading';

import styles from './Swiper.module.scss';

const Swiper = () => {
  const [currentIdx, setCurrentIdx] = useState(1);

  const goToImage = imageIdx => {
    setCurrentIdx(imageIdx);
  };

  return (
    <div className={styles.swiper}>
      <Heading>Шість крутих смаків!</Heading>
      <div className={styles.visibleImages}>
        <div className={styles.prewImgContainer}>
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
        </div>
      </div>
      <div className={styles.dotsContainer}>
        {imgArray.map((item, idx) => {
          return (
            <div
              key={idx}
              className={idx === currentIdx ? styles.activeDot : styles.dot}
              onClick={() => {
                goToImage(idx);
              }}
            >
              ●
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Swiper;
