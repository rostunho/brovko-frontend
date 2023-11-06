import Image from 'shared/components/Image';

import CameraIcon from 'shared/icons/CameraIcon';
import UserLight from 'shared/icons/UserLight';

import styles from './avatar.module.scss';
import Button from 'shared/components/Button';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/user/userSelectors';

const Avatar = () => {
  const addPhoto = () => {console.log('addPhoto')}
  // const text='Діана'
  const {firstName} = useSelector(selectUser)
  console.log(useSelector(selectUser))
  return (
    <>
    <Button className={styles.wrapper} onClick={addPhoto}>
      {/* <div > */}
        <Image   className={styles.avatar} text={firstName} />
        <CameraIcon className={styles.cameraIcon} 
        //  fill='var(--white-text-color)' 
        />
      {/* </div> */}
      </ Button>
      
    </>
  );
};

export default Avatar;



