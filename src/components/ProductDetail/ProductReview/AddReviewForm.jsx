import { useState } from 'react';

export default function AddReviewForm({ productId, onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const reviewData = {
      productId,
      text,
    };
    // Відправка даних на бекенд
    onSubmit(reviewData);
    // Скиндання форми після відправки
    setText('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* <label htmlFor="text">Текст відгуку:</label> */}
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
  );
}
