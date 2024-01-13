import RewiewRating from './ReviewRating';
import Image from 'shared/components/Image';

import styles from '../ProductDetail.module.scss';
import Button from 'shared/components/Button';

const formatDate = (dateString) => new Date(dateString).toLocaleString();

const ReviewItem = ({ review, isExpandedReview }) => {
  const {
    owner: { avatarURL, email, name },
    text: { createdAt, reviewURL, text: reviewText },
  } = review;

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
                  text={email || name}
                  fontSize={16}
                />
              </div>

              <div>
                <p className={styles.userName}>
                  {' '}
                  {email || name}
                </p>
                <p className={styles.reviewDate}>{formatDate(createdAt)}</p>
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
                text={email || name}
                fontSize={16}
              />
            </div>
            <div>
              <p className={styles.userName}>
                {' '}
                {email || name}
              </p>
              <p className={styles.reviewDate}>{formatDate(createdAt)}</p>
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
        </>
      )}
    </div>
  );
};

export default ReviewItem;
