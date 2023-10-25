import { useState } from 'react';

import Heading from 'shared/components/Heading';

import styles from './PersonalData.module.scss';

const PersonalData = () => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleShowingInfo = () => {
    setShowInfo(!showInfo);
  };
  return (
    <>
      <div onClick={toggleShowingInfo} className={styles.heading}>
        <Heading type="h3">Персональні дані</Heading>
      </div>
      {showInfo && <div className={styles.userInfo}>Блок відкрито</div>}
    </>
  );
};

export default PersonalData;
