import styles from './image.module.scss';

const Image = props => {
  const {
    imageURL = defaultImage,
    imageAlt = 'Смаколик',
    imageHeight = '100%',
    imageWidth = '100%',
    imageStyle,
  } = props;
  const imageStyles = {
    ...imageStyle,
  };
  return (
    <img
      className={styles}
      style={imageStyles}
      src={imageURL}
      alt={imageAlt}
      height={imageHeight}
      width={imageWidth}
    />
  );
};

export default Image;
