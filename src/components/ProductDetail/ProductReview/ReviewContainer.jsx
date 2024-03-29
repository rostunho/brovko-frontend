import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectReviewError } from 'redux/reviews/reviewsSelectors';
import Button from 'shared/components/Button';
import AddReviewForm from './AddReviewForm';
import { ReviewStatistics } from './ReviewStatistics';
import ErrorNotification from '../ProductData/ErrorNotification';
import styles from './ReviewContainer.module.scss';

export default function ReviewContainer() {
  const { productId } = useParams();
  const [isReviewInputVisible, setIsReviewInputVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);

  const reviewsError = useSelector(selectReviewError);

  const toggleReviewInput = () => {
    setIsReviewInputVisible(!isReviewInputVisible);
    setIsAddingPhoto(false); // При відкритті поля для відгуку скидаємо стан додавання фото
  };

  // const toggleAddingPhoto = () => {
  //   setIsAddingPhoto(!isAddingPhoto);
  // };

  const closeReviewInput = () => {
    setIsReviewInputVisible(false);
    setIsAddingPhoto(false);
  };

  const numberOfReviews = ReviewStatistics({ productId });

  return (
    <div className={styles.rewieContainer}>
      <h3 className={styles.rewieTitle}>
        Відгуки покупців{' '}
        <span className={styles.rewieCount}>{numberOfReviews}</span>
      </h3>

      <p className={styles.descriptionText}>
        Ваші відгуки допоможуть іншим у виборі смаколика для свого улюбленця!
      </p>

      {reviewsError && <ErrorNotification errorCode={reviewsError} />}

      {!isReviewInputVisible && (
        <Button
          type="button"
          // type="submit"
          onClick={toggleReviewInput}
          mode="outlined"
          size="lg"
          style={{ margin: 20 }}
        >
          Залишити відгук
        </Button>
      )}
      {isReviewInputVisible && (
        <AddReviewForm
          onClick={toggleReviewInput}
          closeReviewInput={closeReviewInput}
          isOpen={isReviewInputVisible}
          productId={productId}
        />
      )}
    </div>
  );
}
