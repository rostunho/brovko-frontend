import { NavLink } from 'react-router-dom';
import styles from './AuthNav.module.scss';

export default function AuthNav() {
  return (
    <div className={styles.wrap}>
      <NavLink to="/register" className={styles.link}>
        Реєстрація
      </NavLink>{' '}
      |
      <NavLink to="login" className={styles.link}>
        Вхід
      </NavLink>
    </div>
  );
}
