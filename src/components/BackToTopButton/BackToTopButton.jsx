import { createPortal } from 'react-dom';
import BackToTopIcon from 'shared/icons/BackToTopIcon';
import styles from './BackToTopButton.module.scss';

export default function BackToTopButton({ animation, ...props }) {
  return createPortal(
    <button
      className={`${styles['to-top-button']} ${
        animation ? styles['fade-out'] : ''
      } `}
    >
      <BackToTopIcon className={styles['to-top-icon']} />
    </button>,
    document.querySelector('#service-root')
  );
}
