import StarEmpty from 'shared/icons/StarEmpty';
import styles from '../ProductDetail.module.scss';

export default function ReviewRating() {
  return (
    <div className={styles.rating}>
      <StarEmpty />
      <StarEmpty />
      <StarEmpty />
      <StarEmpty />
      <StarEmpty />
    </div>
  );
}
