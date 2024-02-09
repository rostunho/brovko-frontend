import { useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import styles from './SharedLinkButton.module.scss';

export default function ReadMoreBackButton({ to, state, label, onClick }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
    if (onClick) onClick();
  };

  return (
    <Link
      className={styles.readMoreLink}
      to={to}
      state={state}
      onClick={handleButtonClick}
    >
      <p className={styles.readMoreButton}>{label}</p>
      <DropdownArrowIcon
        className={`${styles.readMoreIcon} ${isExpanded ? styles['readMoreIcon-reverse'] : ''}`}
      />
    </Link>
  );
}

