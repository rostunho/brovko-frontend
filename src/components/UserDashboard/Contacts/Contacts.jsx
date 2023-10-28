import { useState } from 'react';

// import Heading from 'shared/components/Heading/Heading';
import UserDataHeading from 'shared/components/UserDataHeading';
import ContactsForm from './ContactsForm';

import styles from './Contacts.module.scss';

const Contacts = () => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleShowingInfo = () => {
    setShowInfo(!showInfo);
  };
  return (
    <>
      {/* <div onClick={toggleShowingInfo} className={styles.heading}>
        <Heading type="h3">Контакти</Heading>
      </div> */}
      <UserDataHeading onClick={toggleShowingInfo} opened={showInfo}>
        Контакти
      </UserDataHeading>
      {showInfo && (
        <div className={styles['contacts-info']}>
          <ContactsForm />
        </div>
      )}
    </>
  );
};

export default Contacts;
