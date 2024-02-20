import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectUser } from 'redux/user/userSelectors';

import styles from './Nav.module.scss';

export default function AdminNav({ onClick }) {
  const { email } = useSelector(selectUser);
  return (
    <>
      <ul>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/admin">
            Адмін
          </NavLink>
        </li>
        {/* <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/superadmin">
            SuperAdmin
          </NavLink>
        </li> */}
      </ul>
    </>
    //
  );
}
