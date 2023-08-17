import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

export default function Nav({ onClick }) {
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/product-list-page">
            Крамничка
          </NavLink>
        </li>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/were-to-buy">
            Де придбати
          </NavLink>
        </li>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/about">
            Про нас
          </NavLink>
        </li>

        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/contacts">
            КОНТАКТИ
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
