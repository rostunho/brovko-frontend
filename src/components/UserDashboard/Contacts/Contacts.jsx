import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { update } from 'redux/user/userOperations';
import { selectUser } from 'redux/user/userSelectors';
import { addPopupOperation } from 'redux/popup/popupOperations';

import Loader from 'components/Loader';
import UserDataHeading from 'components/UserDashboard/UserDataHeading';
import ContactsForm from './ContactsForm';

import styles from './Contacts.module.scss';

const Contacts = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const { phone, email, novaPoshta, buildingNumber, flat, _id } =
    useSelector(selectUser);

  // const { city, street, warehouse } = novaPoshta;
  const dispatch = useDispatch();

  const onSubmitForm = async data => {
    try {
      setLoading(true);
      await dispatch(update(data));
      dispatch(addPopupOperation('Нові дані записано!'));
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      dispatch(
        addPopupOperation('Не вдалося оновити, спробуйте ще разок', 'error')
      );
      setLoading(false);
    }
  };

  const toggleShowingInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <>
      {loading && <Loader />}
      <UserDataHeading onClick={toggleShowingInfo} opened={showInfo}>
        Контакти
      </UserDataHeading>
      {showInfo && (
        <div className={styles['contacts-info']}>
          <ContactsForm
            phone={phone}
            email={email}
            city={novaPoshta?.city}
            street={novaPoshta?.street}
            warehouse={novaPoshta?.warehouse}
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
