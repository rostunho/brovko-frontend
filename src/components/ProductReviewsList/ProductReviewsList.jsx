import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getReviewsByProductId } from 'shared/services/api/brovko';
import NewReviewItem from 'shared/components/NewReviewItem/NewReviewItem';
import styles from './ProductReviewsList.module.scss';

export default function ProductReviewsList() {
  const { productId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentReviews, setCurrentReviews] = useState([]);

  useEffect(() => {
    (async () => {
      const originalReviews = await getReviewsByProductId(productId);
      const { comments } = originalReviews[0];
      // console.log('originalReviews :>> ', originalReviews);
      console.log('comments :>> ', comments);
      const adaptedReviews = oridinalReviewsProccessing(comments);
      console.log('adaptedReviews :>> ', adaptedReviews);
      setCurrentReviews([...adaptedReviews]);

      // setCurrentReviews([...originalReviews]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const oridinalReviewsProccessing = reviews => {
    return reviews
      .filter(review => review.text.status.approved === true)
      .map(review => {
        console.log('review :>> ', review);
        const adaptedReview = {};
        adaptedReview.owner = review.owner;
        adaptedReview.createdAt = review.text.createdAt;
        adaptedReview.text = review.text.text;
        adaptedReview.reviewURL = review.text.reviewURL;
        adaptedReview.status = review.text.status;

        return adaptedReview;
      });
  };

  return (
    <>
      {currentReviews &&
        currentReviews.length > 0 &&
        currentReviews.map((review, idx) => {
          return <NewReviewItem key={idx} review={review} mode="approved" />;
        })}
    </>
  );
}
