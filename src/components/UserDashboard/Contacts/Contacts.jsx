import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from 'redux/user/userOperations';
import { selectUser } from 'redux/user/userSelectors';

import UserDataHeading from 'components/UserDashboard/UserDataHeading';
import ContactsForm from './ContactsForm';

import styles from './Contacts.module.scss';

const Contacts = () => {
  const [showInfo, setShowInfo] = useState(false);
  const { phone, email, novaPoshta, buildingNumber, flat, _id } =
    useSelector(selectUser);
  const { city, street, warehouse } = novaPoshta;
  const dispatch = useDispatch();

  const onSubmitForm = data => {
    dispatch(update(data));
  };

  const toggleShowingInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <>
      <UserDataHeading onClick={toggleShowingInfo} opened={showInfo}>
        Контакти
      </UserDataHeading>
      {showInfo && (
        <div className={styles['contacts-info']}>
          <ContactsForm
            phone={phone}
            email={email}
            city={city}
            street={street}
            warehouse={warehouse}
            buildingNumber={buildingNumber}
            flat={flat}
            id={_id}
            onSubmitForm={onSubmitForm}
          />
        </div>
      )}
    </>
  );
};

export default Contacts;
