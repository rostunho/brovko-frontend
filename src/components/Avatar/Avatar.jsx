import Image from 'shared/components/Image';

import CameraIcon from 'shared/icons/CameraIcon';
import UserLight from 'shared/icons/UserLight';

import styles from './avatar.module.scss';
import Button from 'shared/components/Button';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/user/userSelectors';

const Avatar = () => {
  const addPhoto = () => {console.log('addPhoto')}
  const {firstName, email, avatarURL, middleName} = useSelector(selectUser)
  console.log(useSelector(selectUser))
  return (
    <>
    <Button className={styles.wrapper} onClick={addPhoto}>
        <Image   className={styles.avatar} src={middleName} text={firstName || email} />
        <CameraIcon className={styles.cameraIcon} 
        />
      </ Button>

    </>
  );
};

export default Avatar;



