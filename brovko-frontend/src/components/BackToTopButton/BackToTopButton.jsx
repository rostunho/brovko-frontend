import { createPortal } from 'react-dom';
import BackToTopIcon from 'shared/icons/BackToTopIcon';
import styles from './BackToTopButton.module.scss';

export default function BackToTopButton({ animation, ...props }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return createPortal(
    <button
      className={`${styles['to-top-button']} ${
        animation ? styles['fade-out'] : ''
      } `}
      onClick={scrollToTop}
    >
      <BackToTopIcon className={styles['to-top-icon']} />
    </button>,
    document.querySelector('#service-root')
  );
}
