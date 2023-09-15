import styles from './ProductDetail.module.scss';

export default function Content({ note }) {
  return (
    <div className={styles.contentContainer}>
      <p className={styles.contentText}>
        <span className={styles.contentHeader}>СКЛАД:</span> {note}
      </p>
    </div>
  );
}
