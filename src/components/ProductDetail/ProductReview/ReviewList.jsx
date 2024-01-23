import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewItem from './ReviewItem';
import styles from './ReviewList.module.scss';

function ReviewList({ reviews, isExpandedReview = true }) {
  // if (!reviews || !reviews.comments) {
  //   return <></>;
  // }
  const allReviews = reviews.flatMap(review => review.comments);
  const [displayedReviews, setdisplayedReviews] = useState([]);

  useEffect(() => {
    if (reviews.length === 0) {
      return;
    }
    const displayedReviews = isExpandedReview
      ? allReviews
      : allReviews?.slice(0, 1);

    setdisplayedReviews(displayedReviews);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews]);

  return (
    <div className={styles.reviewList}>
      {displayedReviews &&
        displayedReviews.map(review => (
          <ReviewItem
            key={review.text.createdAt}
            review={review}
            isExpandedReview={isExpandedReview}
          />
        ))}
    </div>
  );
}

export default ReviewList;
