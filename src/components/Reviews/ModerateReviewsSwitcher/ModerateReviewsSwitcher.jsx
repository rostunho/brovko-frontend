import { NavLink, useLocation } from 'react-router-dom';
import Rectangle from 'components/Rectangle';
import styles from './ModerateReviewsSwitcher.module.scss';

export default function ModerateReviewsSwitcher({ ...props }) {
  const { pathname } = useLocation();

  return (
    <>
      <Rectangle />
      <ul className={styles.list}>
        <li>
          <NavLink
            to="/moderate-reviews/new"
            className={`${styles.link} ${
              pathname === '/moderate-reviews/new' ? styles['link--active'] : ''
            }`}
          >
            Нові
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/moderate-reviews/approved"
            className={`${styles.link} ${
              pathname === '/moderate-reviews/approved'
                ? styles['link--active']
                : ''
            }`}
          >
            Затверджені
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/moderate-reviews/rejected"
            className={`${styles.link} ${
              pathname === '/moderate-reviews/rejected'
                ? styles['link--active']
                : ''
            }`}
          >
            Відхилені
          </NavLink>
        </li>
      </ul>
      <Rectangle />
    </>
  );
}
