import { useState } from 'react';
import styles from './Footer.module.scss';
import PropTypes from 'prop-types';

const FooterIcon = ({ href, icon, label }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(prevIsActive => !prevIsActive);
    window.open(href, '_blank');
  };

  return (
    <a
      href={href}
      className={`${styles.icon} ${isActive ? styles.active : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {icon}
    </a>
  );
};

FooterIcon.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default FooterIcon;
