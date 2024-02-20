import { useSearchParams } from 'react-router-dom';
import Rectangle from 'components/Rectangle';
import styles from './FeedbackSwitcher.module.scss';

export default function FeedbackSwitcher() {
  const [, setSearchParams] = useSearchParams();

  const changeCommentsCategory = category => {
    setSearchParams({ feedbacks: category }, { replace: true });
  };
  return (
    <>
      <Rectangle />
      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={styles.button}
            onClick={() => changeCommentsCategory('new')}
          >
            Нові
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.button}
            onClick={() => changeCommentsCategory('all')}
          >
            Усі
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.button}
            onClick={() => changeCommentsCategory('archived')}
          >
            Архів
          </button>
        </li>
      </ul>
      <Rectangle />
    </>
  );
}
