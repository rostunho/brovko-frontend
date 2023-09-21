import { NavLink } from 'react-router-dom';

import styles from './Nav.module.scss';

export default function AuthNav({ onClick }) {
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/auth/register">
            Реєстрація
          </NavLink>
        </li>

        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/auth/login">
            LogIn
          </NavLink>
        </li>

        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/order">
            ORDER
          </NavLink>
        </li>

        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/main">
            Вийти
          </NavLink>
        </li>
      </ul>
    </nav>

  );
}
