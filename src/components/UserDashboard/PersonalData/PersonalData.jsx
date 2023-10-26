import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { current } from 'redux/user/userOperations';
import { selectUser } from 'redux/user/userSelectors';

import Heading from 'shared/components/Heading';
import PersonalDataForm from './PersonalDataForm';

import styles from './PersonalData.module.scss';

const PersonalData = () => {
  const [showInfo, setShowInfo] = useState(false);

  const dispatch = useDispatch();
  const { name, email } = useSelector(selectUser);

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  const onSubmitForm = data => {
    console.log(
      'редагнули особисті дані, треба функція для відправки на бек',
      data
    );
  };

  console.log(name, email);

  const toggleShowingInfo = () => {
    setShowInfo(!showInfo);
  };
  return (
    <>
      <div onClick={toggleShowingInfo} className={styles.heading}>
        <Heading type="h3">Персональні дані</Heading>
      </div>
      {showInfo && (
        <div className={styles.userInfo}>
          <PersonalDataForm
            firstName={name === undefined ? '' : name}
            lastName={email === undefined ? '' : email}
            onSubmitForm={onSubmitForm}
          />
        </div>
      )}
    </>
  );
};

export default PersonalData;
