import RewiewRating from './ReviewRating';
import AvatarIcon from 'shared/icons/AvatarIcon';

import styles from '../ProductDetail.module.scss';

const ReviewItem = ({ review }) => {
  return (
    <div className={styles.reviewItem}>
      <div className={styles.userInfo}>
        {/* Відображати <AvatarIcon />, якщо фото користувача відсутнє */}
        {review.user.avatar ? (
          <img
            src={review.user.avatar}
            alt={review.user.name}
            className={styles.avatar}
          />
        ) : (
          <AvatarIcon fill="#FF5733" className={styles.avatar} />
        )}
        <div>
          <p className={styles.userName}>{review.user.name}</p>
          <p className={styles.reviewDate}>{review.date}</p>
        </div>
      </div>

      {/* <p className={styles.reviewRating}>Rating: {review.rating}</p> */}
      <RewiewRating />

      <p className={styles.reviewText}>{review.text}</p>
    </div>
  );
};

export default ReviewItem;