import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAddReview } from 'redux/reviews/reviewsOperations';
import Button from 'shared/components/Button';
import StarEmptyBig from 'shared/icons/StarEmtyBig';
import PaperClip from 'shared/icons/PaperClip';
import CrossIcon from 'shared/icons/CrossIcon';
import styles from './AddRewiewForm.module.scss';

export default function AddReviewForm({ toggleReviewInput, closeReviewInput }) {
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
    closeReviewInput();
  };

  return (
    <div className={styles.containerInputRewiew}>
      <Button mode="close" onClick={closeReviewInput} />
      <p className={styles.titleText}>Оцініть, будь ласка, смаколик</p>
      <div className={styles.starBlock}>
        <StarEmptyBig />
        <StarEmptyBig />
        <StarEmptyBig />
        <StarEmptyBig />
        <StarEmptyBig />
      </div>

      <p className={styles.titleText}>Коментар</p>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            className={styles.comment}
            placeholder="..."
            id="text"
            name="text"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
        </div>
        <div className={styles.addImg}>
          <PaperClip />
          <p className={styles.titleText}>Додати зображення</p>
        </div>

        <Button
          className={styles.commentButton}
          type="submit"
          onClick={toggleReviewInput}
          mode="outlined"
        >
          Опублікувати
        </Button>
      </form>
    </div>
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
