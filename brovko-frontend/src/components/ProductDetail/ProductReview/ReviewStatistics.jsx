import { useSelector } from 'react-redux';
import { getAllReviews } from 'redux/reviews/reviewsSelectors';

// UNUSABLE
export function ReviewStatistics({ productId }) {
  const allReviews = useSelector(getAllReviews);

  if (!allReviews) {
    return null;
  }
  const reviews = allReviews?.find(r => r.productId === productId);

  if (!reviews) {
    return null;
  }

  const sortedReviews = reviews.comments.flatMap(comment =>
    comment.text.map(review => ({
      owner: comment.owner,
      text: review.text,
      createdAt: review.createdAt,
    }))
  );

  const numberOfReviews = sortedReviews.length;

  return numberOfReviews;
}
