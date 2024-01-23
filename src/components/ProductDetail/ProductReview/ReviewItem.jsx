import { useSelector } from 'react-redux';
import { selectUser } from 'redux/user/userSelectors';
import RewiewRating from './ReviewRating';
import Image from 'shared/components/Image';
import AdminReviewsButtons from './AdminReviewsButtons';

import styles from './ReviewItem.module.scss';
// import Button from 'shared/components/Button';

const formatDate = dateString => new Date(dateString).toLocaleString();

const ReviewItem = ({ review, isExpandedReview }) => {
  const { firstName, lastName, status } = useSelector(selectUser);

  console.log('status :>> ', status);

  const {
    owner: { avatarURL, email, name },
    text: { createdAt, reviewURL, text: reviewText },
    // status: { approved, approvedAt, approvedBy },
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
                  height={'32px'}
                />
              </div>

              <div>
                <p className={styles.userName}>{email || name}</p>
                <p className={styles.reviewDate}>{formatDate(createdAt)}</p>
              </div>
            </div>

            <RewiewRating />
            <p className={styles.reviewText}>{reviewText}</p>

            {reviewURL && reviewURL[0] !== null && reviewURL.length > 0 && (
              <div className={styles.imgContainer}>
                {reviewURL.map((reviewURL, index) => (
                  <Image
                    className={styles.imgReview}
                    key={index}
                    src={reviewURL}
                  />
                ))}
              </div>
            )}
            {status === 'manager' ||
              (status === 'superadmin' && (
                <AdminReviewsButtons name={firstName + ' ' + lastName} />
              ))}
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
                height={'32px'}
              />
            </div>
            <div>
              <p className={styles.userName}> {email || name}</p>
              <p className={styles.reviewDate}>{formatDate(createdAt)}</p>
            </div>
          </div>

          <RewiewRating />

          <p className={styles.reviewText}>{reviewText}</p>
          {reviewURL && reviewURL[0] !== null && reviewURL.length > 0 && (
            <div className={styles.imgContainer}>
              {reviewURL.map((reviewURL, index) => (
                <Image
                  className={styles.imgReview}
                  key={index}
                  src={reviewURL}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewItem;
