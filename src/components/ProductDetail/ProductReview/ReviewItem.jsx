import RewiewRating from './ReviewRating';
import AvatarIcon from 'shared/icons/AvatarIcon';

import styles from '../ProductDetail.module.scss';

const ReviewItem = ({ reviews }) => {
  console.log('review ITEM', reviews);
  const ownerOfFirstReview = reviews[0]?.comments[0]?.owner;

  if (ownerOfFirstReview) {
    // Тут ви можете використовувати ownerOfFirstReview
    console.log('owner', ownerOfFirstReview);
    console.log('_id', reviews[0]?.comments[0]?._id);
  } else {
    console.log('Owner не знайдено');
  }
  return (
    <div className={styles.reviewItem}>
      <div className={styles.userInfo}>
        {/* Відображати <AvatarIcon />, якщо фото користувача відсутнє */}
        {reviews.comments.owner.avatar ? (
          <img
            src={reviews.comments.owner.avatar}
            alt={reviews.owner.name}
            className={styles.avatar}
          />
        ) : (
          <AvatarIcon fill="#FF5733" className={styles.avatar} />
        )}
        <div>
          <p className={styles.userName}>{reviews.comments.owner.name}</p>
          <p className={styles.reviewDate}>{reviews.createdAt}</p>
        </div>
      </div>

      {/* <p className={styles.reviewRating}>Rating: {review.rating}</p> */}
      <RewiewRating rating={reviews.rating} />

      <p className={styles.reviewText}>{reviews.text[0]}</p>
    </div>
  );
};

export default ReviewItem;
