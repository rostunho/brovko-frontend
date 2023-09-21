import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

export default function AuthNav() {
  return (
    <div className={styles.wrap}>
      <NavLink to="/register" className={styles.authLink}>
        Реєстрація
      </NavLink>{' '}
      |
      <NavLink to="login" className={styles.authLink}>
        Вхід
      </NavLink>
    </div>
  );
}
