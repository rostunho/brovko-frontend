import { NavLink, useLocation } from 'react-router-dom';
import styles from './Nav.module.scss';

export default function ProductsNav({ onClick, isMobile }) {
  const location = useLocation();
  return (
    <>
      <ul className={styles.list}>
        <li className={styles.item} onClick={onClick}>
          <NavLink
            className={styles.link}
            to={
              location.pathname === '/shop/product-list-page'
                ? `${location.pathname + location.search}`
                : '/shop/product-list-page'
            }
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
