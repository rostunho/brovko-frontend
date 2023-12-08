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
    text = '',
    fontSize,
  } = props;
  const imageStyles = {
    ...style,
  };

  // console.log('src :>> ', src);
  // const letterAvatar = text.substring(0, 1).toUpperCase();
  // console.log(letterAvatar);

  const imageDetecting = src => {
    if (typeof src === 'object') {
      return src[0];
    }
    if (typeof src === 'string') {
      return src;
    }
  };

  const image = imageDetecting(src);

  return (
    <>
      {text.length > 0 && !src && (
        <p className={styles.letter} style={{ fontSize: fontSize + 'px' }}>
          {' '}
          {text.substring(0, 1).toUpperCase()}{' '}
        </p>
      )}
      {(!text.length > 0 || src) && (
        <img
          // className={className || styles.img}
          className={`${styles.img} ${className ? className : ''}`}
          style={imageStyles}
          src={image || defaultImage}
          alt={alt}
          height={height}
          width={width}
        />
      )}
    </>
  );
};

export default Image;
