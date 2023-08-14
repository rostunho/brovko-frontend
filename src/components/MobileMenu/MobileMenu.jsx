import { createPortal } from 'react-dom';
import Logo from 'shared/icons/Logo';
import CrossIcon from 'shared/icons/CrossIcon';
import styles from './MobileMenu.module.scss';

export default function MobileMenu({ children, onClick, isMobile }) {
  return createPortal(
    <div className={styles.mobileMenu}>
      <div className={styles.head}>
        <div onClick={onClick}>
          <Logo isMobile={isMobile} />
        </div>

        <CrossIcon className={styles.closeButton} onClick={onClick} />
      </div>
      {children}
    </div>,
    document.querySelector('#modal-root')
  );
}
