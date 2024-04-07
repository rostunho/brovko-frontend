import { NavLink } from 'react-router-dom';

import styles from './Nav.module.scss';

export default function AdminNav({ onClick }) {
  return (
    <>
      <ul className={styles.list}>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/admin">
            Адмін
          </NavLink>
        </li>
      </ul>
    </>
    //
  );
}
