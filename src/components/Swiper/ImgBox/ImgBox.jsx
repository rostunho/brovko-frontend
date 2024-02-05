import { useState, useEffect } from 'react';

import useScreenWidth from 'shared/hooks/useScreenWidth';

import Image from 'shared/components/Image';

import styles from './ImgBox.module.scss';

const ImgBox = ({ imgArray, currentIdx }) => {
  const [layoutType, setLayoutType] = useState('mobile');
  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (screenWidth < 768) {
      setLayoutType('mobile');
    } else if (screenWidth >= 768 && screenWidth < 1200) {
      setLayoutType('tablet');
    } else {
      setLayoutType('desktop');
    }
  }, [screenWidth]);

  const layoutClasses = {
    mobile: styles.slidesContainerMob,
    tablet: styles.slidesContainerTablet,
    desktop: styles.slidesContainerDesk,
  };

  return (
    <div className={layoutClasses[layoutType] || ''}>
      <div
        className={styles.visibleImages}
        style={{
          transform:
            layoutType === 'mobile'
              ? `translate(calc(-${currentIdx * 100}% - ${currentIdx * 16}px))`
              : `translate(calc(-${currentIdx * 100}% - ${currentIdx * 24}px))`,
        }}
      >
        {imgArray.map((item, idx) => {
          return (
            <Image
              key={idx}
              src={item.url}
              className={
                idx === currentIdx ? styles.currentImg : styles.sideImg
              }
              style={{
                marginLeft: layoutType === 'mobile' ? '8px' : '12px',
                marginRight: layoutType === 'mobile' ? '8px' : '12px',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImgBox;
