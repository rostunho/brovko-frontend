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
          <NavLink className={styles.link} to="/shipping-and-payments">
            Оплата та доставка
          </NavLink>
        </li>

        {/* <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/exchange-and-return">
            Обмін і повернення
          </NavLink>
        </li> */}

        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/register">
            Реєстрація
          </NavLink>
        </li>

        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/admin">
            Адмін
          </NavLink>
        </li>

        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/login">
            LogIn
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
