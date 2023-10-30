import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from 'redux/user/userSelectors';

// import Heading from 'shared/components/Heading/Heading';
import UserDataHeading from 'components/UserDashboard/UserDataHeading';
import ContactsForm from './ContactsForm';

import styles from '../Contacts/Contacts.module.scss';

console.log('styles :>> ', styles);

const Contacts = () => {
  const [showInfo, setShowInfo] = useState(false);
  const { phone, email, novaPoshta, buildingNumber, flat } =
    useSelector(selectUser);
  // const { MainDescription, Ref } = novaPoshta.city;

  const { city, street, warehouse } = novaPoshta;

  const toggleShowingInfo = () => {
    setShowInfo(!showInfo);
  };

  // console.log('novaPoshta :>> ', novaPoshta);
  // console.log('city :>> ', city);

  return (
    <>
      {/* <div onClick={toggleShowingInfo} className={styles.heading}>
        <Heading type="h3">Контакти</Heading>
      </div> */}
      <UserDataHeading onClick={toggleShowingInfo} opened={showInfo}>
        Контакти
      </UserDataHeading>
      {showInfo && (
        <div className={styles.userInfo}>
          <ContactsForm
            phone={phone}
            email={email}
            city={city}
            street={street}
            warehouse={warehouse}
            buildingNumber={buildingNumber}
            flat={flat}
          />
        </div>
      )}
    </>
  );
};

export default Contacts;
