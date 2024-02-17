import NewReviewItem from 'shared/components/NewReviewItem/NewReviewItem';
import styles from './CommentsList.module.scss';

export default function CommentsList({
  reviews,
  param,
  isMobile,
  listHeight,
  ...props
}) {
  return (
    <ul className={styles.list} style={{ height: listHeight }}>
      {param === 'all' || !isMobile
        ? reviews &&
          reviews.length > 0 &&
          reviews.map((review, idx) => {
            return <NewReviewItem key={idx} review={review} mode="approved" />;
          })
        : reviews &&
          reviews.length > 0 && (
            <NewReviewItem review={reviews[0]} mode="approved" />
          )}
    </ul>
  );
}
