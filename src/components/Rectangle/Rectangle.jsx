import styles from './Rectangle.module.scss';

export default function Rectangle() {
  return (
    <div className={styles['line-container']}>
      <span className={styles.line}></span>
    </div>
  );
}
