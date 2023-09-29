import ReviewItem from './ReviewItem';
import styles from '../ProductDetail.module.scss';

function ReviewList({ reviews, isExpandedReview = true }) {
  console.log('reviews', reviews);

  const displayedReviews = isExpandedReview
    ? reviews.comments
    : reviews.comments.slice(0, 1);

  return (
    <div className={styles.reviewList}>
      {displayedReviews.map(review => (
        <ReviewItem
          key={review._id}
          review={review}
          isExpandedReview={isExpandedReview}
        />
      ))}
    </div>
  );
}

export default ReviewList;
