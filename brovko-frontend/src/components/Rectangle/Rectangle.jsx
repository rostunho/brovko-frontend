import styles from './Rectangle.module.scss';

export default function Rectangle({ padding, admin }) {
  return (
    <div
      className={styles['line-container']}
      style={{
        paddingTop: padding ? '12px' : null,
      }}
    >
      <span className={`${styles.line} ${admin ? styles.admin : ''}`}></span>
    </div>
  );
}
