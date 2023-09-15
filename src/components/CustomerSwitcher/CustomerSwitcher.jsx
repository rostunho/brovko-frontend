import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CustomerSwitcher.module.scss';

export default function CustomerSwitcher() {
  const [activeIs, setActiveIs] = useState('first');

  return (
    <ul className={styles.list}>
      <li>
        <NavLink
          to="/order/login"
          className={`${styles.link} ${
            activeIs === 'first' && styles['link--active']
          }`}
          onClick={() => setActiveIs('first')}
        >
          Вхід для клієнтів
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/order/order-form"
          className={`${styles.link} ${
            activeIs === 'second' && styles['link--active']
          }`}
          onClick={() => setActiveIs('second')}
        >
          Я новий користувач
        </NavLink>
      </li>
    </ul>
  );
}
