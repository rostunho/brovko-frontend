import { useSearchParams } from 'react-router-dom';
import Rectangle from 'components/Rectangle';
import styles from './ModerateReviewsSwitcher.module.scss';

export default function ModerateReviewsSwitcher({
  // onNewClick,
  // onApprovedClick,
  // onRejectedClick,
  ...props
}) {
  const [, setSearchParams] = useSearchParams();

  const changeCommentsCategory = category => {
    // setSearchParams({ comments: category }, { replace: true });

    setSearchParams(
      existingSearchParams => {
        existingSearchParams.set('comments', category);
        return existingSearchParams;
      },
      { replace: true }
    );
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
            onClick={() => changeCommentsCategory('approved')}
          >
            Затверджені
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.button}
            onClick={() => changeCommentsCategory('rejected')}
          >
            Відхилені
          </button>
        </li>
      </ul>
      <Rectangle />
    </>
  );
}
