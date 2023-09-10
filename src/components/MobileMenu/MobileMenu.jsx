import { createPortal } from 'react-dom';
import Logo from 'shared/icons/Logo';
import BasketLight from 'shared/icons/BasketLight';
import UserLight from 'shared/icons/UserLight';
import CrossIcon from 'shared/icons/CrossIcon';
import styles from './MobileMenu.module.scss';
// import { Link } from 'react-router-dom';

export default function MobileMenu({ children, onClick, isMobile }) {
  return createPortal(
    <div className={styles.mobileMenu}>
      <div className={styles.head}>
        <CrossIcon className={styles.closeButton} onClick={onClick} />

        <Logo onClick={onClick} />

        <div className={styles.boxBasket}>
          <UserLight className={styles.closeButton} onClick={onClick} />
          <BasketLight className={styles.closeButton} onClick={onClick} />
        </div>
      </div>
      {children}
    </div>,
    document.querySelector('#modal-root')
  );
}
