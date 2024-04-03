import { useState } from 'react';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import styles from './ReadMoreButton.module.scss';

export default function ReadMoreButton({
  children,
  className,
  onClick,
  ...props
}) {
  const [reverse, setReverse] = useState(false);

  const handleOnClick = () => {
    onClick && onClick();
    setReverse(!reverse);
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${className ? className : ''}`}
      onClick={handleOnClick}
    >
      {children}
      <DropdownArrowIcon
        className={`${styles.icon} ${reverse ? styles.reverse : ''}`}
        size={19}
      />
    </button>
  );
}
