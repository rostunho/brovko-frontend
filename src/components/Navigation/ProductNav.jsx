import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectUser } from 'redux/user/userSelectors';
import Button from 'shared/components/Button/Button';
import styles from './Nav.module.scss';

export default function ProductsNav({ onClick }) {
  const { email } = useSelector(selectUser);
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/shop/product-list-page">
            Крамничка
          </NavLink>
        </li>
        <li className={styles.item} onClick={onClick}>
          <NavLink className={styles.link} to="/shop/favourites">
            Обрані
          </NavLink>
        </li>
      </ul>
    </nav>
    //
  );
}
