import ReviewItem from './ReviewItem';
import styles from '../ProductDetail.module.scss';

function ReviewList({ reviews }) {
  console.log('reviews', reviews);
  return (
    <div className={styles.reviewList}>
      {reviews.map(review => (
        <ReviewItem key={review._id} reviews={reviews} />
      ))}
    </div>
  );
}

export default ReviewList;
