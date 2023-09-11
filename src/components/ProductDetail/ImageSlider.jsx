import Image from 'shared/components/Image';
import styles from './ProductDetail.module.scss';

export default function ImageSlider({ picture }) {
  return (
    <div className={styles.imageSliderContainer}>
      <Image className={styles.imageSlider} src={picture} />
      <Image className={styles.imageSlider} src={picture} />
      <Image className={styles.imageSlider} src={picture} />
    </div>
  );
}
