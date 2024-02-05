import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
// import { selectUser } from 'redux/user/userSelectors';
import { selectIsLogin } from 'redux/user/userSelectors';

import styles from './Nav.module.scss';

export default function AuthNav({ onClick }) {
  const isUserLogin = useSelector(selectIsLogin);
  // const { email } = useSelector(selectUser);
  return (
    <>
      <ul className={styles.list}>
        {!isUserLogin && (
          <>
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
          </>
        )}

        {isUserLogin && (
          <>
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
          </>
        )}
      </ul>
    </>
  );
}
