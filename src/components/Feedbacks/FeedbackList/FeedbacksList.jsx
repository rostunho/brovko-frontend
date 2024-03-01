import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFeedbacks } from 'shared/services/api/brovko/feedback';
import FeedbackItem from '../FeedbackItem/FeedbackItem';
import styles from './FeedbacksList.module.scss';

export default function FeedbacksList({ feedbacks, ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('feedbacks');
  const [currentFeedbacks, setCurrentFeedbacks] = useState([]);

  useEffect(() => {
    setSearchParams({ feedbacks: 'new' }, { replace: true });
    (async () => {
      const feedbacks = await getFeedbacks();
      setCurrentFeedbacks(feedbacks);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!status) {
      return;
    }
    (async () => {
      const feedbacks = await getFeedbacks(status);
      setCurrentFeedbacks(feedbacks);
    })();
  }, [status]);

  return (
    <ul className={styles.list}>
      {currentFeedbacks?.length &&
        currentFeedbacks.map((feedback, idx) => {
          return <FeedbackItem key={idx} feedback={feedback} />;
        })}
    </ul>
  );
}
