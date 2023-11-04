import Image from 'shared/components/Image';

import styles from './avatar.module.scss';
import CameraIcon from 'shared/icons/CameraIcon';
const Avatar = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Image />
        <CameraIcon fill='red' />
      </div>
    </>
  );
};

export default Avatar;
