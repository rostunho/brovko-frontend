import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'shared/components/Modal/Modal';
import { submitReview } from 'shared/services/reviews';

export default function AddReviewFormModal({ isOpen, closeModal }) {
  const [text, setText] = useState('');
  const { productId } = useParams();

  const handleSubmit = e => {
    e.preventDefault();

    const reviewData = {
      productId,
      text,
    };

    submitReview(reviewData);
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
