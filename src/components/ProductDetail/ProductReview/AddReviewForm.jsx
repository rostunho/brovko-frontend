import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAddReview } from 'redux/reviews/reviewsOperations';
import Button from 'shared/components/Button';

export default function AddReviewForm({ toggleReviewInput, closeModal }) {
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
    <>
      <h4>Оцініть, будь ласка, смаколик</h4>
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
        <Button type="submit" onClick={toggleReviewInput} mode="outlined">
          Опублікувати
        </Button>
      </form>
    </>
  );
}

/* <div>
          <textarea
            placeholder="Введіть ваш відгук тут..."
            rows="4"
            cols="50"
          />
          <div style={{ marginTop: 10 }}>
            {!isAddingPhoto && (
              <Button type="button" onClick={toggleAddingPhoto} mode="outlined">
                Додати фото до відгуку
              </Button>
            )}
            {isAddingPhoto && (
              <Button type="button" mode="filled">
                Додано фото
              </Button>
            )}
            <Button type="button" onClick={closeReviewInput} mode="outlined">
              Закрити
            </Button>
            <Button type="button" onClick={toggleReviewInput} mode="outlined">
              Опублікувати
            </Button>
          </div>
        </div> */
