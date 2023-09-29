import ReviewItem from './ReviewItem';
import styles from '../ProductDetail.module.scss';

function ReviewList({ reviews, isExpandedReview = true }) {
  console.log('reviews', reviews);
  if (!reviews || !reviews.comments) {
    return <></>;
  }

  // Витягуємо окремі рецензії з коментарів і розглядаємо їх окремо
  const sortedReviews = reviews.comments
    .flatMap(comment =>
      comment.text.map(review => ({
        owner: comment.owner,
        text: review.text,
        createdAt: review.createdAt,
      }))
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Сортування в зворотньому порядку (новіші вище)
    });

  console.log('sortedReviews', sortedReviews);

  // const displayedReviews = isExpandedReview
  //   ? reviews.comments
  //   : reviews.comments.slice(0, 1);
  const displayedReviews = isExpandedReview
    ? sortedReviews
    : sortedReviews.slice(0, 1);

  console.log('displayedReviews', displayedReviews);

  return (
    <div className={styles.reviewList}>
      {displayedReviews.map(review => (
        <ReviewItem
          key={review.createdAt}
          review={review}
          isExpandedReview={isExpandedReview}
        />
      ))}
    </div>
  );
}

export default ReviewList;
