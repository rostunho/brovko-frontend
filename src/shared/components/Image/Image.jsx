import styles from './image.module.scss';

import defaultImage from './defaultImage.png';

const Image = props => {
  const {
    src,
    alt = 'Смаколик',
    height = '100%',
    width = '100%',
    className,
    style,
  } = props;
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
