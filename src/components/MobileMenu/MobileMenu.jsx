import { createPortal } from 'react-dom';
import { useBodyScrollLock } from 'shared/hooks/useBodyScrollLock';
import Logo from 'shared/icons/Logo';
import BasketLight from 'shared/icons/BasketLight';
import UserLight from 'shared/icons/UserLight';
import Button from 'shared/components/Button';
import styles from './MobileMenu.module.scss';
// import { Link } from 'react-router-dom';

export default function MobileMenu({ children, onClick, isMobile }) {
  useBodyScrollLock();

  return createPortal(
    <div className={styles.mobileMenu}>
      {children}
    </div>,
    document.querySelector('#modal-root')
  );
}
