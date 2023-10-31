import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { current } from 'redux/user/userOperations';
import { selectUser } from 'redux/user/userSelectors';

// import Heading from 'shared/components/Heading';
import UserDataHeading from 'components/UserDashboard/UserDataHeading';
import PersonalDataForm from './PersonalDataForm';
// import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';

import styles from './PersonalData.module.scss';

const PersonalData = () => {
  const [showInfo, setShowInfo] = useState(false);

  const dispatch = useDispatch();
  const { firstName, middleName, lastName } = useSelector(selectUser);

  // console.log('firstName :>> ', firstName);
  // console.log('middleName :>> ', middleName);
  // console.log('lastName :>> ', lastName);

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  const onSubmitForm = data => {
    console.log(
      'редагнули особисті дані, треба функція для відправки на бек',
      data
    );
  };

  const toggleShowingInfo = () => {
    setShowInfo(!showInfo);
  };
  return (
    <>
      {/* <div onClick={toggleShowingInfo} className={styles.heading}>
        <Heading type="h3">Персональні дані</Heading>
        <DropdownArrowIcon className={styles['heading-icon']} />
      </div> */}
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
          />
        </div>
      )}
    </>
  );
};

export default PersonalData;
