import { useState } from 'react';
import Button from 'shared/components/Button';
import AddReviewFormModal from './AddReviewFormModal';
import styles from '../ProductDetail.module.scss';

export default function ReviewContainer({ productId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.rewieContainer}>
      <h3 className={styles.rewieTitle}>
        Відгуки покупців <span className={styles.rewieCount}>(8)</span>
      </h3>

      <p className={styles.descriptionText}>
        Ваші відгуки допоможуть іншим у виборі смаколика для свого улюбленця!
      </p>
      <Button
        type="button"
        onClick={openModal}
        mode="outlined"
        style={{ paddingLeft: 86, paddingRight: 86, marginTop: 20 }}
      >
        Залишити відгук
      </Button>
      {isModalOpen && (
        <AddReviewFormModal
          closeModal={closeModal}
          isOpen={isModalOpen}
          productId={productId}
        />
      )}
    </div>
  );
}
