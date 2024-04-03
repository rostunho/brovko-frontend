import { useState } from 'react';
import EyeIcon from 'shared/icons/EyeIcon';
import ClosedEyeIcon from 'shared/icons/ClosedEyeIcon';
import styles from './PasswordToggler.module.scss';

export default function PasswordToggler({ ...props }) {
  const [eyeIsOpen, setEyeIsOpen] = useState(false);

  const { onClick } = props;

  const toggleIcon = event => {
    onClick && onClick(event);
    setEyeIsOpen(!eyeIsOpen);
  };

  return (
    <>
      {eyeIsOpen ? (
        <EyeIcon {...props} className={styles.icon} onClick={toggleIcon} />
      ) : (
        <ClosedEyeIcon
          {...props}
          className={styles.icon}
          onClick={toggleIcon}
        />
      )}
    </>
  );
}
