import styles from './image.module.scss';

import defaultImage from './defaultImage.png';

const Image = props => {
  const {
    src,
    alt = 'Смаколик',
    height,
    width,
    className,
    style,
    text,
  } = props;
  const imageStyles = {
    ...style,
  };
  const letterAvatar = text.substring(0, 1).toUpperCase();
  console.log(letterAvatar);
  return (
    <>
      {src || <p> className={styles.letter} {letterAvatar} </p> ||
      
        <img
          className={className || styles.img}
          style={imageStyles}
          src={src || defaultImage}
          alt={alt}
          height={height}
          width={width}
        />
      }
    </>
  );
};

export default Image;
