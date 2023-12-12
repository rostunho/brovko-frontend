import ReviewItem from './ReviewItem';
import styles from '../ProductDetail.module.scss';

function ReviewList({ reviews, isExpandedReview = true }) {
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

  const displayedReviews = isExpandedReview
    ? sortedReviews
    : sortedReviews.slice(0, 1);

  return (
    <div className={styles.reviewList}>
      {displayedReviews.map(review => (
        <ReviewItem
          key={review.createdAt}
          review={review}
          avatarURL={review.owner.avatarURL}
          text={review.owner.email || review.owner.name}
          isExpandedReview={isExpandedReview}
        />
      ))}
    </div>
  );
}

export default ReviewList;
