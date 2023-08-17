import styles from './image.module.scss';

import defaultImage from './defaultImage.png';

const Image = props => {
  const {
    imageURL,
    imageAlt = 'Смаколик',
    imageHeight = '100%',
    imageWidth = '100%',
    imageClassName,
    imageStyle,
  } = props;
  const imageStyles = {
    ...imageStyle,
  };
  return (
    <img
      className={imageClassName || styles.img}
      style={imageStyles}
      src={imageURL || defaultImage}
      alt={imageAlt}
      height={imageHeight}
      width={imageWidth}
    />
  );
};

export default Image;
