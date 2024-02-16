// import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useLayoutType from 'shared/hooks/useLayoutType';

import styles from './Footer.module.scss';

const FooterItem = ({ icon, links, label, isOpen, onToggle }) => {
  
  const toggleOpen = () => {
    onToggle(label);
  };

  const location = useLocation();

  const layoutType = useLayoutType();

  const isMobile = layoutType ==='mobile';
  const isTablet = layoutType === 'tablet';
  const isDesktop = layoutType === 'desktop';


  return (
    <div className={styles.footerItem}>
      <div className={styles.footerTitle} onClick={toggleOpen}>
        <span className={`${styles.label} ${isOpen || !isMobile ? styles.opened : ''}`}>
          {label}
        </span>
        {isMobile && (
          <div className={`${styles.footerIconsContainers} ${isOpen || !isMobile ? styles.opened : ''}`}>
            {icon}
          </div>
        )}
      </div>

      {(isOpen || !isMobile) && (
        <ul className={styles.linksList}>
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.url} state={{ from: location }} className={styles.link}>
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
