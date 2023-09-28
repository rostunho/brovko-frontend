import RewiewRating from './ReviewRating';
import AvatarIcon from 'shared/icons/AvatarIcon';

import styles from '../ProductDetail.module.scss';

const ReviewItem = ({ review, isExpandedReview }) => {
  return (
    <div>
      {isExpandedReview ? (
        <ul className={styles.reviewBox}>
          {review.text.map((text, index) => (
            <li className={styles.reviewItem} key={index}>
              <div className={styles.userInfo}>
                <AvatarIcon fill="#FF5733" className={styles.avatar} />
                <div>
                  <p className={styles.userName}>
                    {' '}
                    {review.owner.email || review.owner.name}
                  </p>
                  <p className={styles.reviewDate}>
                    {new Date(text.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <RewiewRating />
              <p className={styles.reviewText}>{text.text}</p>
            </li>
          ))}
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
                {new Date(review.text[0].createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <RewiewRating />

          <p className={styles.reviewText}>{review.text[0].text}</p>
        </>
      )}
    </div>
  );
};

export default ReviewItem;
