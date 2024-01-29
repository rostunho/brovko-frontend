import Rectangle from 'components/Rectangle';
import styles from './ModerateReviewsSwitcher.module.scss';

export default function ModerateReviewsSwitcher({
  onNewClick,
  onApprovedClick,
  onRejectedClick,
  ...props
}) {
  return (
    <>
      <Rectangle />
      <ul className={styles.list}>
        <li>
          <button type="button" className={styles.button} onClick={onNewClick}>
            Нові
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.button}
            onClick={onApprovedClick}
          >
            Затверджені
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.button}
            onClick={onRejectedClick}
          >
            Відхилені
          </button>
        </li>
      </ul>
      <Rectangle />
    </>
  );
}
