import { useState } from 'react';
import EyeIcon from 'shared/icons/EyeIcon';
import ClosedEyeIcon from 'shared/icons/ClosedEyeIcon';
import styles from './PasswordToggler.module.scss';

export default function PasswordToggler({ onClick, ...props }) {
  const [eyeIsOpen, setEyeIsOpen] = useState(true);

  const toggleIcon = event => {
    // console.log('toggleIcon in PasswordToggler :', event);

    setEyeIsOpen(!eyeIsOpen);
    onClick && onClick(event);
  };

  return (
    <>
      {eyeIsOpen ? (
        <EyeIcon className={styles.icon} onClick={toggleIcon} />
      ) : (
        <ClosedEyeIcon className={styles.icon} onClick={toggleIcon} />
      )}
    </>
  );
}
