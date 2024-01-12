import RewiewRating from './ReviewRating';
import Image from 'shared/components/Image';
import Avatar from 'components/Avatar';

import styles from '../ProductDetail.module.scss';
import Button from 'shared/components/Button';

const ReviewItem = ({ review, avatarURL, text, isExpandedReview }) => {
  const user = review.owner.userId;
  console.log('user', user);
  console.log('rewiew', review);
  console.log('reviewURL', review.reviewURL);
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
                  {review.owner.email || review.owner.name}
                </p>
                <p className={styles.reviewDate}>
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <RewiewRating />
            <p className={styles.reviewText}>{review.text}</p>

            {review.reviewURL && review.reviewURL[0] !== null && review.reviewURL.length > 0 && (
              <div className={styles.imgContainer}>
                {review.reviewURL.map((reviewURL, index) => (
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
