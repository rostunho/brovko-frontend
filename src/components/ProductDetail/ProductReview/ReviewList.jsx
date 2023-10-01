import ReviewItem from './ReviewItem';
import { ReviewStatistics } from './ReviewStatistics';
import styles from '../ProductDetail.module.scss';

function ReviewList({ reviews, isExpandedReview = true }) {
  if (!reviews || !reviews.comments) {
    return <></>;
  }

  const { numberOfReviews, sortedReviews } = ReviewStatistics({
    productId: reviews.productId,
  });

  const sortedReviewsList = sortedReviews.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA; // Сортування в зворотньому порядку (новіші вище)
  });

  console.log('numberOfReviewsSortedReviews', numberOfReviews);

  const displayedReviews = isExpandedReview
    ? sortedReviewsList
    : sortedReviewsList.slice(0, 1);

  return (
    <div className={styles.reviewList}>
      {displayedReviews.map(review => (
        <ReviewItem
          key={review.createdAt}
          review={review}
          isExpandedReview={isExpandedReview}
          numberOfReviews={numberOfReviews}
        />
      ))}
    </div>
  );
}

export default ReviewList;
