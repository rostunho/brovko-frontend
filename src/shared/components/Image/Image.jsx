import styles from './image.module.scss';

import defaultImage from './defaultImage.png';

const Image = props => {
  const { src, alt = 'Смаколик', height, width, className, style } = props;
  const imageStyles = {
    ...style,
  };
  return (
    <img
      className={className || styles.img}
      style={imageStyles}
      src={src || defaultImage}
      alt={alt}
      height={height}
      width={width}
    />
  );
};

export default Image;
