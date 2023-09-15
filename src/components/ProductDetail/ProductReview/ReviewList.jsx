import ReviewItem from './ReviewItem';
import styles from '../ProductDetail.module.scss';

function ReviewList({ reviews }) {
  return (
    <div className={styles.reviewList}>
      {reviews.map(review => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}

export default ReviewList;
