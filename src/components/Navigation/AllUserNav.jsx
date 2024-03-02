import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// import { selectUser } from 'redux/user/userSelectors';

import styles from './Nav.module.scss';

export default function AllUserNav({ onClick }) {
  // const currentUser = useSelector(selectUser);

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
        {/*         
        {currentUser.status === 'superadmin' && (
          <li className={styles.item} onClick={onClick}>
            <NavLink className={styles.link} to="/all/admin">
              Адмін
            </NavLink>
          </li>
        )} */}

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
