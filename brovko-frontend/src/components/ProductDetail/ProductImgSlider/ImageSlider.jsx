import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { getAllProducts } from 'redux/products/productsSelectors';

import Image from 'shared/components/Image';

import styles from './ImageSlider.module.scss';

export default function ImageSlider({ picture }) {
  // const { productId } = useParams();
  const [currentIdx, setCurrentIdx] = useState(1);
  const [autoplay, setAutoplay] = useState(true);

  let timeOut = null;

  useEffect(() => {
    timeOut =
      // eslint-disable-next-line react-hooks/exhaustive-deps
      autoplay &&
      setTimeout(() => {
        setCurrentIdx(
          currentIdx === picture.length - 1 || currentIdx === picture.length
            ? 0
            : currentIdx + 1
        );
      }, 2000);
  });

  // const allProducts = useSelector(getAllProducts);
  // // const product = allProducts?.find(p => p._id === productId);

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
    >
      <div className={styles.slidesContainer}>
        <div
          className={styles.visibleImages}
          style={{
            transform: `translate(calc(-${currentIdx * 100}% - ${
              currentIdx * 16
            }px))`,
          }}
        >
          {picture.map((item, idx) => {
            return (
              <Image
                key={idx}
                src={item}
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
        {picture.length > 1 &&
          picture.map((_, idx) => {
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
}
