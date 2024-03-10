import { useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { selectUser } from 'redux/user/userSelectors';

import Heading from 'shared/components/Heading/Heading';

import { data } from './data';

import SEO from 'components/SEO/SEO';

import styles from './AllAdminsPages.module.scss';

const AllAdminsPage = () => {
  const location = useLocation();

  const currentUser = useSelector(selectUser);

  if (
    currentUser.user.status !== 'superadmin' &&
    currentUser.user.status !== 'manager'
  ) {
    return <Navigate to="/" />;
  }

  const linksArray =
    currentUser.user.status === 'superadmin'
      ? data
      : data.filter(item => item.userStatus !== 'superadmin');

  return (
    <div className={styles.container}>
      <Heading>Панель керування</Heading>
      <SEO
        title="Профіль адміна | Панель керування | Brovko"
        description="Профіль адміна | Brovko - магазин корисних смаколиків для песиків"
        url="/admin/"
      />
      <ul className={styles.box}>
        {linksArray.map((card, index) => (
          <li className={styles.link} key={index}>
            <div className={styles.card}>
              <NavLink to={card.link} state={{ from: location }}>
                <Heading type="h2" /*className={styles.title}*/>
                  {card.heading}
                </Heading>
                <p className={styles.text}>{card.text}</p>
              </NavLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllAdminsPage;
