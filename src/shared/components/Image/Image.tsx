import React from 'react';

// import styles from './image.module.scss';

interface ImageProps {
  imageURL: string;
  imageAlt: string;
  imageHeight: number;
  imageWidth: number;
}

const Image: React.FC<ImageProps> = ({
  imageURL,
  imageAlt,
  imageHeight,
  imageWidth,
}) => {
  return (
    <img
      // style={styles}
      src={imageURL}
      alt={imageAlt}
      height={imageHeight}
      width={imageWidth}
    />
  );
};


export default Image;
