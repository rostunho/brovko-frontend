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
    text = "",
  } = props;
  const imageStyles = {
    ...style,
  };
  // const letterAvatar = text.substring(0, 1).toUpperCase();
  // console.log(letterAvatar);
  return (
    <>
      {text.length>0 && !src && (
        <p className={styles.letter}> {text.substring(0, 1).toUpperCase()} </p>
      )}
      {(!text.length>0 || src)  &&  (
        <img
          className={className || styles.img}
          style={imageStyles}
          src={src || defaultImage}
          alt={alt}
          height={height}
          width={width}
        />
      )}
    </>
  );
};

export default Image;
