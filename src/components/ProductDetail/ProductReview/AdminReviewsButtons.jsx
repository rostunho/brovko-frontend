import { useLocation } from 'react-router-dom';
import CheckIcon from 'shared/icons/CheckIcon';
import DeleteCrossIcon from 'shared/icons/DeleteCrossIcon';
import styles from './AdminReviewsButtons.module.scss';

export default function AdminReviewsButtons({ name }) {
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <CheckIcon check="#68BAEE" />
        {/* <p className={styles.text}>Затверджено:</p> */}
        <p className={styles.text}>{name}</p>
      </div>

      <div className={styles.buttons}>
        {!pathname.includes('review') && (
          <button
            type="button"
            className={`${styles.button} ${styles.approve}`}
          >
            <CheckIcon check="#fff" />
          </button>
        )}
        <button type="button" className={`${styles.button} ${styles.reject}`}>
          <DeleteCrossIcon small bg="transparent" />
        </button>
      </div>
    </div>
  );
}
