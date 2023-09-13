import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Button from 'shared/components/Button';
import fakeReviewsData from './fakeRewiewsData';
import ReviewItem from './RewiewItem';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';

import styles from './ProductDetail.module.scss';

export default function Review({ isExpanded, location, handleReadMoreClick }) {
  return (
    <div className={styles.rewieContainer}>
      <h3 className={styles.rewieTitle}>
        Відгуки покупців <span className={styles.rewieCount}>(8)</span>
      </h3>
      <Link to={`review`} state={{ from: location }}>
        <p className={styles.descriptionText}>
          Ваші відгуки допоможуть іншим у виборі смаколика для свого улюбленця!
        </p>
        <Button
          type="submit"
          mode="outlined"
          style={{ paddingLeft: 86, paddingRight: 86, marginTop: 20 }}
        >
          Залишити відгук
        </Button>
      </Link>

      {fakeReviewsData ? (
        isExpanded ? (
          <Outlet />
        ) : (
          <>
            <div className={styles.reviewList}>
              {fakeReviewsData.map(review => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </div>
            <Link
              to={`rewiew`}
              state={{ from: location, isExpanded: true }}
              className={styles.readMoreLink}
              onClick={handleReadMoreClick}
            >
              <p className={styles.readMoreButton}>Дивитися всі відгуки</p>
              <DropdownArrowIcon className={`${styles.readMoreIcon} `} />
            </Link>
          </>
        )
      ) : (
        <p>Завантаження...</p>
      )}
    </div>
  );
}
