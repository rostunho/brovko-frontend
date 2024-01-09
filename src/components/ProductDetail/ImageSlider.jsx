import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllProducts } from 'redux/products/productsSelectors';

import imgArraySlider from './imgArray';
import Image from 'shared/components/Image';

import styles from './ProductDetail.module.scss';

export default function ImageSlider({ picture }) {
  const { productId } = useParams();
  const [currentIdx, setCurrentIdx] = useState(1);
  const [autoplay, setAutoplay] = useState(true);

  let timeOut = null;

  useEffect(() => {
    timeOut =
      // eslint-disable-next-line react-hooks/exhaustive-deps
      autoplay &&
      setTimeout(() => {
        setCurrentIdx(
          currentIdx === imgArraySlider.length - 1 ? 0 : currentIdx + 1
        );
      }, 2000);
  });

  const allProducts = useSelector(getAllProducts);
  // const product = allProducts?.find(p => p._id === productId);

  return (
    // <div className={styles.imageSliderContainer}>
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
      {/* <Heading>Шість крутих смаків!</Heading> */}
      <div className={styles.slidesContainer}>
        <div
          className={styles.visibleImages}
          style={{ transform: `translate(-${currentIdx * 100}%)` }}
        >
          {picture.map((item, idx) => {
            return (
              <Image
                key={idx}
                src={picture || item.url}
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
        {imgArraySlider.map((_, idx) => {
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
    // </div>
  );
}
