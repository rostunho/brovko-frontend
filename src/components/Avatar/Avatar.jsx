import Image from 'shared/components/Image';

import CameraIcon from 'shared/icons/CameraIcon';
import UserLight from 'shared/icons/UserLight';

import styles from './avatar.module.scss';
import Button from 'shared/components/Button';

const Avatar = () => {
  const text='Діана'
  return (
    <>
    <Button className={styles.wrapper}>
      {/* <div > */}
        <Image src="https://shkvarka.ua/wp-content/uploads/05-1-1-e1695742051394.jpg"  className={styles.avatar} text={text} />
        <CameraIcon className={styles.cameraIcon} 
        //  fill='var(--white-text-color)' 
        />
      {/* </div> */}
      </ Button>
    </>
  );
};

export default Avatar;



