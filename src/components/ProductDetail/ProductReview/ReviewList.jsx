import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLayoutType from 'shared/hooks/useLayoutType';
import ReviewItem from './ReviewItem';
import styles from './ReviewList.module.scss';

function ReviewList({ reviews, isExpandedReview = true }) {
  // if (!reviews || !reviews.comments) {
  //   return <></>;
  // }
  const layoutType = useLayoutType();

  const isMobile = layoutType ==='mobile';
  const isTablet = layoutType === 'tablet';
  const isDesktop = layoutType === 'desktop';

  const allReviews = reviews.flatMap(review => review.comments);
  const [displayedReviews, setdisplayedReviews] = useState([]);

  useEffect(() => {
    if (!reviews) return;
  
    let displayedReviews;
  
    if (!isMobile) {
      displayedReviews = isExpandedReview
        ? allReviews
        : allReviews?.slice(0, 3);  // Покажіть 3 відгуки на планшетах
    } else {
      displayedReviews = isExpandedReview
        ? allReviews
        : allReviews?.slice(0, 2); // Покажіть 2 або всі відгуки в залежності від isExpandedReview
    }
  
    setdisplayedReviews(displayedReviews);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews, !isMobile, isExpandedReview]);

  console.log('displayedReviews', displayedReviews);
  

  return (
    <ul className={styles.reviewList}>
      {displayedReviews?.map(review => (
          <ReviewItem
            key={review.text.createdAt}
            review={review}
            isExpandedReview={isExpandedReview}
          />
        ))}
    </ul>
  );
}

export default ReviewList;
