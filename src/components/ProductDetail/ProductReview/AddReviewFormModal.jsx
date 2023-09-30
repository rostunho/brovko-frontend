import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Modal from 'shared/components/Modal/Modal';
import { submitReview } from 'shared/services/reviews';
import { fetchAddReview } from 'redux/reviews/reviewsOperations';

export default function AddReviewFormModal({ isOpen, closeModal }) {
  const [text, setText] = useState('');
  const { productId } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const reviewData = {
      productId,
      text,
    };

    dispatch(fetchAddReview(reviewData));

    setText('');
    closeModal();
  };

  return (
    <Modal centered isOpen={isOpen} closeModal={closeModal}>
      <h2>Додати відгук</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            placeholder="Напишіть ваш відгук..."
            id="text"
            name="text"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
        </div>
        <button type="submit">Додати відгук</button>
      </form>
    </Modal>
  );
}
