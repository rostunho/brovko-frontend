import Heading from 'shared/components/Heading/Heading';

import { data } from './data';

import styles from './AllAdminsPages.module.scss';

const AllAdminsPage = () => {
  return (
    <div className={styles.container}>
      <Heading>Панель керування</Heading>
      <ul className={styles.box}>
        {data.map((card, index) => (
          <li className={styles.link} key={index}>
            <div className={styles.card}>
              <div className={styles.icon}>{card.heading}</div>
              <div className={styles.text}>{card.text}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllAdminsPage;
