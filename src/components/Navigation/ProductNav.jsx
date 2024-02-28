import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectUser } from 'redux/user/userSelectors';
import Button from 'shared/components/Button/Button';
import styles from './Nav.module.scss';

export default function ProductsNav({ onClick, isMobile }) {
  const { email } = useSelector(selectUser);
  const location = useLocation();
  console.log('location in Menu', location);

  return (
    <>
      <ul className={styles.list}>
        <li className={styles.item} onClick={onClick}>
          <NavLink
            className={styles.link}
            to="/shop/product-list-page"
            state={{ from: location }}
          >
            Крамничка
          </NavLink>
        </li>
        {isMobile && (
          <li className={styles.item} onClick={onClick}>
            <NavLink
              className={styles.link}
              to="/shop/favourites"
              state={{ from: location }}
            >
              Обрані
            </NavLink>
          </li>
        )}
      </ul>
    </>
    //
  );
}
