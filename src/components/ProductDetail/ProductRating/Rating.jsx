import StarEmpty from 'shared/icons/StarEmpty';
import { ReviewStatistics } from '../ProductReview/ReviewStatistics';
import styles from './Rating.module.scss';

export default function Rating({ className }) {
  return (
    <div className={`${styles.rating} ${className ? className : ''}`}>
      <StarEmpty className={styles.star} />
      <StarEmpty className={styles.star} />
      <StarEmpty className={styles.star} />
      <StarEmpty className={styles.star} />
      <StarEmpty className={styles.star} />
      <p className={styles.ratingText}> 0 відгуків</p>
    </div>
  );
}
