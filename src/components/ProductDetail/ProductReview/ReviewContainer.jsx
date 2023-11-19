import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'shared/components/Button';
import AddReviewForm from './AddReviewForm';
import { ReviewStatistics } from './ReviewStatistics';
import styles from '../ProductDetail.module.scss';

export default function ReviewContainer() {
  const { productId } = useParams();

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewInputVisible, setIsReviewInputVisible] = useState(false);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  const toggleReviewInput = () => {
    setIsReviewInputVisible(!isReviewInputVisible);
    setIsAddingPhoto(false); // При відкритті поля для відгуку скидаємо стан додавання фото
  };

  const toggleAddingPhoto = () => {
    setIsAddingPhoto(!isAddingPhoto);
  };

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
      {!isReviewInputVisible && (
        <Button
          type="button"
          onClick={toggleReviewInput}
          mode="outlined"
          style={{ paddingLeft: 86, paddingRight: 86, marginTop: 20 }}
        >
          Залишити відгук
        </Button>
      )}
      {isReviewInputVisible && (
        <AddReviewForm
          closeModal={closeReviewInput}
          isOpen={isReviewInputVisible}
          productId={productId}
        />
      )}
    </div>
  );
}
