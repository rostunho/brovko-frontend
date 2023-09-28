import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'shared/components/Modal/Modal';
import { submitReview } from 'shared/services/reviews';

export default function AddReviewFormModal({ closeModal, onSubmit }) {
  const [text, setText] = useState('');
  const { productId } = useParams();

  const handleSubmit = e => {
    e.preventDefault();

    const reviewData = {
      productId,
      text,
    };
    console.log('reviewData', reviewData);
    submitReview(reviewData);
    closeModal();
    setText('');
  };

  console.log('text', text);
  console.log('productId', productId);

  return (
    // <Modal centered closeModal={closeModal}>
    <>
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
    </>

    // </Modal>
  );
}
