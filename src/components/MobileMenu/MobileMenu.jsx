import { createPortal } from 'react-dom';
import { useBodyScrollLock } from 'shared/hooks/useBodyScrollLock';
import styles from './MobileMenu.module.scss';

export default function MobileMenu({ children, onClick, isMobile }) {
  useBodyScrollLock();

  return createPortal(
    <div className={styles.mobileMenu}>{children}</div>,
    document.querySelector('#modal-root')
  );
}
