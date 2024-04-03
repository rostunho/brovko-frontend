import { useState } from 'react';

import ReviewItemLargeImage from '../ReviewItemImageSlider/ReviewItemLargeImage';
import Button from 'shared/components/Button';
import Image from 'shared/components/Image';
import styles from './ReviewItemImageBox.module.scss';

export default function ReviewItemImageBox({ reviewURLs }) {
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [imageIdx, setImageIdx] = useState(0);
  //   const [imageSrc, setImageSrc] = useState(null);

  //   console.log('imageSrc :>> ', imageSrc);

  const openLargeImage = (id, url) => {
    setImageIdx(id);
    // setImageSrc(reviewURLs[imageIdx]);
    setShowLargeImage(true);
  };

  const nextLargeImage = () => {
    setImageIdx(prevIdx => prevIdx + 1);
  };

  const prevLargeImage = () => {
    setImageIdx(prevIdx => prevIdx - 1);
  };

  const closeLargeImage = () => {
    setShowLargeImage(false);
  };

  return (
    <>
      {reviewURLs && reviewURLs[0] !== null && reviewURLs.length > 0 && (
        <div className={styles['img-container']}>
          {reviewURLs.map((reviewURLs, index) => (
            <Button
              key={index}
              className={styles.btn}
              type="button"
              onClick={() => openLargeImage(index, reviewURLs)}
            >
              <Image
                className={styles['img-review']}
                key={index}
                src={reviewURLs}
              />
            </Button>
          ))}
        </div>
      )}
      {showLargeImage && (
        <ReviewItemLargeImage
          idx={imageIdx}
          src={reviewURLs[imageIdx]}
          alt={imageIdx}
          closeLargeImage={closeLargeImage}
          nextLargeImage={nextLargeImage}
          previousLargeImage={prevLargeImage}
          disableNext={imageIdx + 1 >= reviewURLs.length}
          disablePrev={imageIdx < 1}
        />
      )}
    </>
  );
}
