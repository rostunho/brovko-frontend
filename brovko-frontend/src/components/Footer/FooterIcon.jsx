import { useState } from 'react';
import styles from './Footer.module.scss';
import PropTypes from 'prop-types';

const FooterIcon = ({ href, icon, label, ariaLabel }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(prevIsActive => !prevIsActive);
    window.open(href, '_blank');
  };

  return href ? (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`${styles.icon} ${isActive ? styles.active : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {icon}
    </a>
  ) : (
    icon
  );
};

FooterIcon.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default FooterIcon;
