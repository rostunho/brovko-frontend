import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { update } from 'redux/user/userOperations';
import { selectUser } from 'redux/user/userSelectors';
import { addPopupOperation } from 'redux/popup/popupOperations';

import Loader from 'components/Loader';
import UserDataHeading from 'components/UserDashboard/UserDataHeading';
import PersonalDataForm from './PersonalDataForm';

import styles from './PersonalData.module.scss';

const PersonalData = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser).user;
  const dispatch = useDispatch();

  const onSubmitForm = async data => {
    try {
      setLoading(true);
      // const result = await dispatch(update(data));
      // console.log('result into Personal Data :>> ', result);
      dispatch(addPopupOperation('Перезаписали!'));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // console.log('error into Personal Data', error);
      dispatch(
        addPopupOperation('Не вдалося видалити, спробуйте ще разок', 'error')
      );
    }
  };

  const toggleShowingInfo = () => {
    setShowInfo(!showInfo);
  };
  return (
    <>
      {loading && <Loader />}
      <UserDataHeading onClick={toggleShowingInfo} opened={showInfo}>
        Персональні дані
      </UserDataHeading>
      {showInfo && (
        <div className={styles.userInfo}>
          <PersonalDataForm
            firstName={user?.firstName}
            middleName={user?.middleName}
            lastName={user?.lastName}
            onSubmitForm={onSubmitForm}
            id={user?._id}
          />
        </div>
      )}
    </>
  );
};

export default PersonalData;
