import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewItem from './ReviewItem';
import styles from '../ProductDetail.module.scss';

function ReviewList({ reviews, isExpandedReview = true }) {
  // if (!reviews || !reviews.comments) {
  //   return <></>;
  // }
  const [allReviews, setAllReviews] = useState([]);

  const [displayedReviews, setdisplayedReviews] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    setAllReviews(reviews);
  }, [reviews]);

  useEffect(() => {
    if (allReviews.length === 0) {
      return;
    }

    console.log('ALL REVIEWS: >>>', allReviews);
    console.log(typeof allReviews);
    console.log('productId :>> ', productId);

    const productReviews = allReviews.reviews.find(
      r => r.productId === productId
    );

    // Витягуємо окремі рецензії з коментарів і розглядаємо їх окремо
    const sortedReviews = productReviews.comments
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

    setdisplayedReviews(displayedReviews);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allReviews]);

  console.log('reviews into RL :>> ', reviews);

  return (
    <div className={styles.reviewList}>
      {displayedReviews &&
        displayedReviews.map(review => (
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
