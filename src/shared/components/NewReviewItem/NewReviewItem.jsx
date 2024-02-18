import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserStatus } from 'redux/user/userSelectors';
import ReviewItemAdminBar from './ReviewItemAdminBar/ReviewItemAdminBar';
import ReviewItemImageBox from './ReviewItemImageBox/ReviewItemImageBox';
import Avatar from 'components/Avatar';
import Image from '../Image';
import ReviewRating from 'components/ProductDetail/ProductReview/ReviewRating';
import styles from './NewReviewItem.module.scss';

export default function NewReviewItem({ review, mode, className }) {
  const [searchParams] = useSearchParams();
  const userStatus = useSelector(selectUserStatus);
  const isAdmin = userStatus === 'manager' || userStatus === 'superadmin';

  return (
    <li className={`${styles.container} ${className ? className : ''}`}>
      <p className={styles.product}>{review.productName}</p>
      <div className={styles.author}>
        <Image
          src={review.owner.avatarURL}
          className={styles.avatar}
          width="40px"
          height="40px"
          marginLeft="0"
          marginRight="0"
          text={review.owner.name || review.owner.email}
          locked
        />
        <div>
          <p className={styles.user}>
            {review.owner.name || review.owner.email}
          </p>
          <p className={styles['post-date']}>
            {new Date(review.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <ReviewRating />
      <p className={styles.message}>{review.text}</p>
      {review.reviewURL.length > 0 && (
        <ReviewItemImageBox reviewURLs={review.reviewURL} />
      )}

      {isAdmin && (
        <ReviewItemAdminBar
          className={styles['admin-bar']}
          mode={mode || searchParams.get('comments')}
          name={
            review?.status?.approvedBy?.userName ||
            review?.status?.approvedBy?.userEmail
          }
          date={new Date(review.status.approvedAt).toLocaleString()}
          ids={{
            productId: review.productId,
            commentId: review.commentId,
            textId: review.textId,
          }}
        />
      )}
    </li>
  );
}
