import RewiewRating from './ReviewRating';
import Avatar from 'components/Avatar';

import styles from '../ProductDetail.module.scss';

const ReviewItem = ({ review, avatarURL, text, isExpandedReview }) => {
  return (
    <div>
      {isExpandedReview ? (
        <ul className={styles.reviewBox}>
          <li className={styles.reviewItem}>
            <div className={styles.userInfo}>
              <Avatar
                size={40}
                marginLeft={16}
                marginRight={12}
                marginBottom={8}
                fontSize={16}
                src={avatarURL}
                text={text}
              />

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
            <Avatar
              size={40}
              marginLeft={16}
              marginRight={12}
              marginBottom={8}
              fontSize={16}
              src={avatarURL}
              text={text}
            />
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
