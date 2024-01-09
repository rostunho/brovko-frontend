import RewiewRating from './ReviewRating';
import Image from 'shared/components/Image';
import Avatar from 'components/Avatar';

import styles from '../ProductDetail.module.scss';

const ReviewItem = ({ review, avatarURL, text, isExpandedReview }) => {
  const user = review.owner.userId;
  console.log('user', user);
  console.log('rewiew', review);

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
      {/* {selectedPictures.map(({ id, url }, index) => (
    <Button
      key={index}
      className={styles.btn}
      type="button"
      onClick={e => {
        openModalEditPhoto(index, url);
      }}
    >
      <Image
        key={index}
        src={url}
        alt={`preview-${index + 1}`}
        className={styles.img}
      />
    </Button>
  ))} */}
    </div>
  );
};

export default ReviewItem;
