import RewiewRating from './ReviewRating';
import AvatarIcon from 'shared/icons/AvatarIcon';
import Avatar from 'components/Avatar';

import styles from '../ProductDetail.module.scss';

const ReviewItem = ({ review, isExpandedReview }) => {
  return (
    <div>
      {isExpandedReview ? (
        <ul className={styles.reviewBox}>
          <li className={styles.reviewItem}>
            <div className={styles.userInfo}>
              <Avatar className={styles.avatar} />
              {/* <AvatarIcon fill="#FF5733" className={styles.avatar} /> */}
              <div>
                <p className={styles.userName}>
                  {' '}
                  {review.owner.email || review.owner.name}
                </p>
                <p className={styles.reviewDate}>
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <RewiewRating />
            <p className={styles.reviewText}>{review.text}</p>
          </li>
        </ul>
      ) : (
        <>
          <div className={styles.userInfo}>
            <AvatarIcon fill="#FF5733" className={styles.avatar} />
            <div>
              <p className={styles.userName}>
                {' '}
                {review.owner.email || review.owner.name}
              </p>
              <p className={styles.reviewDate}>
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <RewiewRating />

          <p className={styles.reviewText}>{review.text}</p>
        </>
      )}
    </div>
  );
};

export default ReviewItem;
