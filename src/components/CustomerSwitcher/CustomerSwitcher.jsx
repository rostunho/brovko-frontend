import { NavLink, useLocation } from 'react-router-dom';
import styles from './CustomerSwitcher.module.scss';

export default function CustomerSwitcher() {
  const { pathname } = useLocation();

  return (
    <ul className={styles.list}>
      <li>
        <NavLink
          to="/order/login"
          className={`${styles.link} ${
            pathname === '/order/login' ? styles['link--active'] : ''
          }`}
        >
          Вхід для клієнтів
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/order/order-form"
          className={`${styles.link} ${
            pathname === '/order/order-form' ? styles['link--active'] : ''
          }`}
        >
          Я новий користувач
        </NavLink>
      </li>
    </ul>
  );
}
