import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from 'redux/user/userOperations';
import { selectUser } from 'redux/user/userSelectors';

import UserDataHeading from 'components/UserDashboard/UserDataHeading';
import PersonalDataForm from './PersonalDataForm';

import styles from './PersonalData.module.scss';

const PersonalData = () => {
  const [showInfo, setShowInfo] = useState(false);
  const { firstName, middleName, lastName, _id } = useSelector(selectUser);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  console.log(user);

  const onSubmitForm = data => {
    dispatch(update(data));
  };

  const toggleShowingInfo = () => {
    setShowInfo(!showInfo);
  };
  return (
    <>
      <UserDataHeading onClick={toggleShowingInfo} opened={showInfo}>
        Персональні дані
      </UserDataHeading>
      {showInfo && (
        <div className={styles.userInfo}>
          <PersonalDataForm
            firstName={firstName}
            middleName={middleName}
            lastName={lastName}
            onSubmitForm={onSubmitForm}
            id={_id}
          />
        </div>
      )}
    </>
  );
};

export default PersonalData;
