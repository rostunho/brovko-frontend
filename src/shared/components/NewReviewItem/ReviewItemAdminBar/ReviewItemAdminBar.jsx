import Rectangle from 'components/Rectangle';
import CrossIcon from 'shared/icons/CrossIcon';
import CheckIcon from 'shared/icons/CheckIcon';
import BasketSmall from 'shared/icons/BasketSmall';
import styles from './ReviewItemAdminBar.module.scss';

export default function ReviewItemAdminBar({ mode, name, date }) {
  console.log('mode :>> ', mode);
  return (
    <div className={styles.container}>
      <Rectangle admin />

      <div
        className={`${styles['inner-container']} ${
          mode === 'new' ? styles.new : ''
        }`}
      >
        {mode === 'approved' && <CheckIcon check="#68BAEE" />}

        {(mode === 'approved' || mode === 'rejected') && (
          <div className={styles.info}>
            <p className={styles.text}>{name || 'TEST4'}</p>
            <p className={styles.text}>{date}</p>
          </div>
        )}

        <div className={styles.buttons}>
          {(mode === 'new' || mode === 'rejected') && (
            <button
              type="button"
              className={`${styles.button} ${styles.approve} ${
                mode === 'new' ? styles.wide : ''
              }`}
            >
              <CheckIcon size="16" check="#fff" />
              {mode === 'new' && 'Все OK'}
            </button>
          )}
          {(mode === 'approved' || mode === 'new') && (
            <button
              type="button"
              className={`${styles.button} ${styles.reject} ${
                mode === 'new' ? styles.wide : ''
              }`}
            >
              <CrossIcon stroke="#fff" />
              {mode === 'new' && 'Блокувати'}
            </button>
          )}

          {mode === 'rejected' && (
            <button
              type="button"
              className={`${styles.button} ${styles.delete}`}
            >
              <BasketSmall size="24" stroke="#fff" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
