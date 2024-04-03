import { useState } from 'react';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import styles from './DropdownToggler.module.scss';

export default function DropdownToggler({ className, onClick, ...props }) {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
    onClick && onClick();
  };

  return (
    <DropdownArrowIcon
      className={`${className} ${styles.icon} ${
        dropdownIsOpen && styles['icon--reverse']
      }`}
      onClick={toggleDropdown}
    />
  );
}
