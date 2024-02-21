import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Heading from 'shared/components/Heading/Heading';

import { data } from './data';

import styles from './AllAdminsPages.module.scss';

const AllAdminsPage = () => {
  
  const location = useLocation();

  return (
    <div className={styles.container}>
      <Heading>Панель керування</Heading>
      <ul className={styles.box}>
        {data.map((card, index) => (
          <li className={styles.link} key={index}>
          
          <div className={styles.card}>
          <NavLink to={card.link} state={{ from: location }}>
              <div className={styles.icon}>{card.heading}</div>
              <div className={styles.text}>{card.text}</div>
          </NavLink>
          </div>
         
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllAdminsPage;
