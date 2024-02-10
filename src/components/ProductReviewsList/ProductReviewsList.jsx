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
    const prevSearchParams = Object.fromEntries(searchParams.entries());
    const checkStatus = searchParams.get('reviews');

    if (!checkStatus) {
      // console.log('prevSearchParams :>> ', prevSearchParams);
      setSearchParams({ ...prevSearchParams, reviews: 'collapse' });
    } else {
      setSearchParams({ ...prevSearchParams, reviews: checkStatus });
    }

    (async () => {
      const originalReviews = await getReviewsByProductId(productId);
      const { comments } = originalReviews[0];
      const adaptedReviews = oridinalReviewsProccessing(comments);
      setCurrentReviews([...adaptedReviews]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const oridinalReviewsProccessing = reviews => {
    return reviews
      .filter(review => review.text.status.approved === true)
      .map(review => {
        // console.log('review :>> ', review);
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
