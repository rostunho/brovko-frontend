import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getReviewsByStatus } from 'shared/services/api/brovko';
import NewReviewItem from '../NewReviewItem/NewReviewItem';
import styles from './NewReviewsList.module.scss';

export default function NewReviewsList({ style, ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setSearchParams({ comments: 'new' }, { replace: true });
    (async () => {
      const newReviews = await getReviewsByStatus();
      console.log('newReviews :>> ', newReviews);
      setReviews([...newReviews.data]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const category = searchParams.get('comments');

    (async () => {
      const updatedReviews = await getReviewsByStatus(category);
      setReviews([...updatedReviews.data]);
    })();
  }, [searchParams]);
  return (
    <ul style={style}>
      {reviews &&
        reviews.length > 0 &&
        reviews.map((review, idx) => {
          return <NewReviewItem key={idx} review={review} />;
        })}
    </ul>
  );
}
