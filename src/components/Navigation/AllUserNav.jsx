import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUser } from 'redux/user/userSelectors';

import styles from './Nav.module.scss';

export default function UserNav({ onClick }) {
  const currentUser = useSelector(selectUser);
  return (
    <>
      <ul className={styles.list}>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/all/actions">
            Акції
          </NavLink>
        </li>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/all/about">
            Про Бровка
          </NavLink>
        </li>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/all/perevagy">
            Чому це корисно?
          </NavLink>
        </li>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/all/contacts">
            КОНТАКТИ
          </NavLink>
        </li>
        {currentUser.status === 'superadmin' && (
          <li className={styles.item} onClick={onClick}>
            <NavLink className={styles.link} to="/all/superadmin">
              Сторінка суперадміна
            </NavLink>
          </li>
        )}

        {/* <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/all/shipping-and-payments">

            Оплата та доставка
          </NavLink>
        </li>

        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/all/exchange-and-return">

            Обмін і повернення
          </NavLink>
        </li> */}

        {/* <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/admin">
            Адмін
          </NavLink>
        </li> */}
      </ul>
    </>
    //
  );
}
