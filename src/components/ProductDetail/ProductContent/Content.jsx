import styles from './Content.module.scss';

export default function Content({ note }) {
  return (
    <div className={styles.contentContainer}>
      <h3>СКЛАД:</h3> {note}
    </div>
  );
}
