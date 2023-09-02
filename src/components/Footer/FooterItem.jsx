import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const FooterItem = ({ icon, links, label, isOpen, onToggle }) => {
  //   const [isOpen, setIsOpen] = useState(false);

  //   const toggleOpen = () => {
  //     setIsOpen(!isOpen);
  //   };

  const toggleOpen = () => {
    onToggle(label);
  };

  return (
    <div className={styles.footerItem}>
      <div className={styles.footerTitle} onClick={toggleOpen}>
        <span className={`${styles.label} ${isOpen ? styles.opened : ''}`}>
          {label}
        </span>
        <div
          className={`${styles.footerIconsContainers} ${
            isOpen ? styles.opened : ''
          }`}
        >
          {icon}
        </div>
      </div>

      {isOpen && (
        <ul className={styles.linksList}>
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.url} className={styles.link}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

FooterItem.propTypes = {
  icon: PropTypes.element.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FooterItem;
