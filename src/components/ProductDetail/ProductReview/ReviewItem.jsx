import RewiewRating from './ReviewRating';
import Image from 'shared/components/Image';
import Avatar from 'components/Avatar';

import styles from '../ProductDetail.module.scss';
import Button from 'shared/components/Button';

const ReviewItem = ({ review, isExpandedReview }) => {
  // const user = review.comments?.owner?.userId;
  const avatarURL = review.owner.avatarURL;
  const text = review.owner?.email || review.owner?.name;
  const createdAt = review.text.createdAt;
  const reviewURL = review.text.reviewURL;
  const reviewText = review.text.text;
  
  return (
    <div>
      {isExpandedReview ? (
        <ul className={styles.reviewBox}>
          <li className={styles.reviewItem}>
            <div className={styles.userInfo}>
              <div className={styles.avatarWrapper}>
                <Image
                  className={styles.avatar}
                  src={avatarURL}
                  text={text}
                  fontSize={16}
                />
              </div>

              <div>
                <p className={styles.userName}>
                  {' '}
                  {text}
                </p>
                <p className={styles.reviewDate}>
                  {new Date(createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <RewiewRating />
            <p className={styles.reviewText}>{reviewText}</p>

            {reviewURL && reviewURL[0] !== null && reviewURL.length > 0 && (
              <div className={styles.imgContainer}>
                {reviewURL.map((reviewURL, index) => (
                <Image className={styles.imgReview} key={index} src={reviewURL} />
                ))}
              </div>)
            }
          </li>
        </ul>
      ) : (
        <>
          <div className={styles.userInfo}>
            <div className={styles.avatarWrapper}>
              <Image
                className={styles.avatar}
                src={avatarURL}
                text={text}
                fontSize={16}
              />
            </div>
            <div>
              <p className={styles.userName}>
                {' '}
                {text}
              </p>
              <p className={styles.reviewDate}>
                {new Date(createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <RewiewRating />

          <p className={styles.reviewText}>{reviewText}</p>
        </>
      )}
    </div>
  );
};

export default ReviewItem;
