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
          <NavLink className={styles.link} to="/actions">
            Акції
          </NavLink>
        </li>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/about">
            Про Бровка
          </NavLink>
        </li>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/perevagy">
            Чому це корисно?
          </NavLink>
        </li>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/contacts">
            КОНТАКТИ
          </NavLink>
        </li>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/where-to-buy">
            Де придбати
          </NavLink>
        </li>

        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/start">
            START PAGE (тимчасова кнопка)
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
