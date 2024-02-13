import { useState, useEffect } from 'react';
import { getReviewsByStatus } from 'shared/services/api/brovko';
import ReviewItem from 'components/ProductDetail/ProductReview/ReviewItem';
import NewReviewItem from 'shared/components/NewReviewItem/NewReviewItem';

export default function ApprovedReviews({ ...props }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getReviewsByStatus('approved');
      console.log('data :>> ', data);
      setReviews([...data]);
    })();
  }, []);

  return (
    <ul>
      {reviews.length > 0 &&
        reviews.map((review, index) => {
          return (
            <li key={index}>
              <NewReviewItem review={review} />
            </li>
          );
        })}
    </ul>
  );
}
