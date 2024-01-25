import { useState, useEffect } from 'react';
import { getReviewsByStatus } from 'shared/services/api/brovko';
import ReviewItem from 'components/ProductDetail/ProductReview/ReviewItem';

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
        reviews.map(review => {
          return (
            <li>
              <ReviewItem review={review} />
            </li>
          );
        })}
    </ul>
  );
}
