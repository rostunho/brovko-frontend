import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import styles from './Nav.module.scss';

export default function AllUserNav({ onClick }) {

  const location = useLocation();

  return (
    <>
      <ul className={styles.list}>
        <li className={styles.item} onClick={onClick}>
          <NavLink
            className={styles.link}
            to="/all/about"
            state={{ from: location }}
          >
            Про Бровка
          </NavLink>
        </li>

        <li className={styles.item} onClick={onClick}>
          <NavLink
            className={styles.link}
            to="/all/where-to-buy"
            state={{ from: location }}
          >
            Локації
          </NavLink>
        </li>

        <li className={styles.item} onClick={onClick}>
          <NavLink
            className={styles.link}
            to="/all/advantages"
            state={{ from: location }}
          >
            Чому це корисно?
          </NavLink>
        </li>

        <li className={styles.item} onClick={onClick}>
          <NavLink
            className={styles.link}
            to="/all/contacts"
            state={{ from: location }}
          >
            КОНТАКТИ
          </NavLink>
        </li>
      </ul>
    </>
    //
  );
}
