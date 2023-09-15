import styles from './Rectangle.module.scss';

export default function Rectangle({ padding }) {
  return (
    <div
      className={styles['line-container']}
      style={{
        paddingTop: padding ? '12px' : null,
      }}
    >
      <span className={styles.line}></span>
    </div>
  );
}
