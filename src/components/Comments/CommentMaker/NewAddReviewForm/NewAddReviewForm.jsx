import { useState } from 'react';
import Button from 'shared/components/Button';
import StarEmptyBig from 'shared/icons/StarEmtyBig';
import styles from './NewAddReviewForm.module.scss';

export default function NewAddReviewForm({ onClose, ...props }) {
  const [message, setMessage] = useState('');

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
      <form>
        <label className={styles.label}>
          Коментар:
          <textarea
            className={styles.textarea}
            rows="6"
            onChange={e => setMessage(e.target.value)}
            required
          />
        </label>

        <Button type="submit" size="lg" className={styles['submit-button']}>
          Опублікувати
        </Button>
      </form>
    </div>
  );
}
