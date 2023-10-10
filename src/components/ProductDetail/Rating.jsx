import StarEmpty from 'shared/icons/StarEmpty';
import { ReviewStatistics } from './ProductReview/ReviewStatistics';
import styles from './ProductDetail.module.scss';

export default function Rating({ product }) {
  const productId = product._id;
  const numberOfReviews = ReviewStatistics({ productId });

  return (
    <div className={styles.rating}>
      <StarEmpty />
      <StarEmpty />
      <StarEmpty />
      <StarEmpty />
      <StarEmpty />
      <p className={styles.ratingText}>{numberOfReviews} відгуків</p>
    </div>
  );
}
