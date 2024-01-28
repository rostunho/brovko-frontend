import { useState } from 'react';
import Rectangle from 'components/Rectangle';
import CrossIcon from 'shared/icons/CrossIcon';
import CheckIcon from 'shared/icons/CheckIcon';
import BasketSmall from 'shared/icons/BasketSmall';
import Prompt from 'shared/components/Prompt';
import styles from './ReviewItemAdminBar.module.scss';

export default function ReviewItemAdminBar({ mode, name, date }) {
  const [showApprovePrompt, setShowApprovePrompt] = useState(false);
  const [showRejectPrompt, setShowRejectPrompt] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

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
              onMouseEnter={() => setShowApprovePrompt(true)}
              onMouseLeave={() => setShowApprovePrompt(false)}
            >
              <CheckIcon size="16" check="#fff" />
              {mode === 'new' && 'Все OK'}
              {showApprovePrompt && mode !== 'new' && (
                <p className={styles.prompt}>Затвердити</p>
              )}
            </button>
          )}
          {(mode === 'approved' || mode === 'new') && (
            <button
              type="button"
              className={`${styles.button} ${styles.reject} ${
                mode === 'new' ? styles.wide : ''
              }`}
              onMouseEnter={() => setShowRejectPrompt(true)}
              onMouseLeave={() => setShowRejectPrompt(false)}
            >
              <CrossIcon stroke="#fff" />
              {mode === 'new' && 'Блокувати'}
              {showRejectPrompt && mode !== 'new' && (
                <p className={styles.prompt}>Заблокувати</p>
              )}
            </button>
          )}

          {mode === 'rejected' && (
            <button
              type="button"
              className={`${styles.button} ${styles.delete}`}
              onMouseEnter={() => setShowDeletePrompt(true)}
              onMouseLeave={() => setShowDeletePrompt(false)}
            >
              <BasketSmall size="24" stroke="#fff" />
              {showDeletePrompt && mode !== 'new' && (
                <p className={styles.prompt}>Видалити</p>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
