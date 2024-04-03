import StarEmpty from 'shared/icons/StarEmpty';
import styles from './Rating.module.scss';

export default function Rating({ className, commentsLength }) {
  return (
    <div className={`${styles.rating} ${className ? className : ''}`}>
      <StarEmpty className={styles.star} />
      <StarEmpty className={styles.star} />
      <StarEmpty className={styles.star} />
      <StarEmpty className={styles.star} />
      <StarEmpty className={styles.star} />
      <p className={styles.ratingText}> {commentsLength} відгуків</p>
    </div>
  );
}
