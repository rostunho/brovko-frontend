import NewReviewItem from '../NewReviewItem/NewReviewItem';
import styles from './NewReviewsList.module.scss';

export default function NewReviewsList({ reviews, ...props }) {
  return (
    <ul>
      {reviews &&
        reviews.length > 0 &&
        reviews.map((review, idx) => {
          return <NewReviewItem key={idx} review={review} />;
        })}
    </ul>
  );
}
