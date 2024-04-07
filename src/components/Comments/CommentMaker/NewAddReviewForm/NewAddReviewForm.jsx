/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { submitReview } from 'shared/services/api/brovko/reviews';
import { addPopupOperation } from 'redux/popup/popupOperations';
import Modal from 'shared/components/Modal/Modal';
import Button from 'shared/components/Button';
import StarEmptyBig from 'shared/icons/StarEmtyBig';
import styles from './NewAddReviewForm.module.scss';
import AddPhotoInput from 'shared/components/AddPhotoInput';

export default function NewAddReviewForm({ onClose, ...props }) {
  const [message, setMessage] = useState('');

  // eslint-disable-next-line no-unused-vars

  const [selectedPicturesReview, setSelectedPicturesReview] = useState([]);

  // eslint-disable-next-line no-unused-vars

  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const { productId } = useParams();
  const dispatch = useDispatch();

 

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('text', message);

    selectedPicturesReview.forEach(({ file }) => {
      formData.append(`review`, file);
    });

    try {
      await submitReview(formData);
      setMessage('');
      setSelectedPicturesReview([]);
      setShowThankYouModal(true);
    } catch (error) {
      console.error('Error submiting review:', error.response.status);
      if (error.response.status === 403 || error.response.status === 401) {
        dispatch(
          addPopupOperation(
            'Ви не можете додавати відгуки, поки не авторизуєтеся',
            'error'
          )
        );
      } else {
        dispatch(
          addPopupOperation(
            'Щось з відгуками пішло не так, спробуй пізніше',
            'warning'
          )
        );
      }
    } finally {
    }
  };

  const closeModal = () => {
    setShowThankYouModal(false);
    onClose();
  };

  const thankYouModalContent = (
    <Modal className={styles['modal-container']} closeModal={closeModal}>
      <div className={styles.modal}>
        <h2>Дякуємо за відгук!</h2>
        <p className={styles.modalText}>
          Ваш відгук буде опубліковано після попередньої перевірки нашими
          співробітниками.
        </p>
      </div>
    </Modal>
  );

  return (
    <div className={styles.container}>
      <Button mode="close" onClick={onClose} />
      <p className={styles.prompt}>Оцініть, будь ласка, смаколик</p>
      {/* замінити на окремий компонент з логікою заповнення шкали рейтингу */}
      <div className={styles['star-block']}>
        <StarEmptyBig />
        <StarEmptyBig />
        <StarEmptyBig />
        <StarEmptyBig />
        <StarEmptyBig />
      </div>
      {/* */}
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Коментар:
          <textarea
            className={styles.textarea}
            rows="6"
            onChange={e => setMessage(e.target.value)}
            required
          />
        </label>

        <AddPhotoInput setFiles={setSelectedPicturesReview} maxFiles={5}/>

        <Button type="submit" size="lg" className={styles['submit-button']}>
          Опублікувати
        </Button>
      </form>

      {showThankYouModal && thankYouModalContent}
    </div>
  );
}
