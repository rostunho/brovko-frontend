import styles from './ProductDetail.module.scss';

export default function Content({ description }) {
  return (
    <div className={styles.contentContainer}>
      <p className={styles.contentText}>
        <span className={styles.contentHeader}>СКЛАД:</span> {description}
      </p>
    </div>
  );
}
