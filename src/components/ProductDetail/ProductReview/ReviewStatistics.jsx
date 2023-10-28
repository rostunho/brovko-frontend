import { useSelector } from 'react-redux';
import { getAllReviews } from 'redux/reviews/reviewsSelectors';

export function ReviewStatistics({ productId }) {
  const allReviews = useSelector(getAllReviews);
  const reviews = allReviews?.find(r => r.productId === productId);

  const sortedReviews = reviews?.comments?.flatMap(comment =>
    comment.text.map(review => ({
      owner: comment.owner,
      text: review.text,
      createdAt: review.createdAt,
    }))
  );

  const numberOfReviews = sortedReviews.length;

  return numberOfReviews;
}
