import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Button from 'shared/components/Button';
import fakeReviewsData from './fakeRewiewsData';
import ReviewItem from './ReviewItem';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';

import styles from './ProductDetail.module.scss';

export default function Review({
  isExpandedReview,
  location,
  handleReadReviewClick,
}) {
  return (
    <>
      {fakeReviewsData ? (
        isExpandedReview ? (
          <>
            <Outlet />
          </>
        ) : (
          <>
            <div className={styles.reviewList}>
              {fakeReviewsData.slice(0, 1).map(review => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </div>
            <Link
              to={`review`}
              state={{ from: location, isExpandedReview: true }}
              className={styles.readMoreLink}
              onClick={handleReadReviewClick}
            >
              <p className={styles.readMoreButton}>Дивитися всі відгуки</p>
              <DropdownArrowIcon className={`${styles.readMoreIcon} `} />
            </Link>
          </>
        )
      ) : (
        <p>Завантаження...</p>
      )}
    </>
  );
}
