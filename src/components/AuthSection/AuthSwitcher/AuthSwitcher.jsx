import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './AuthSwitcher.module.scss';

export default function AuthSwitcher({
  to,
  type = 'regular',
  children,
  linkLabel,
  ...props
}) {
  return (
    <p className={`${styles.text} ${styles[`text--${type}`]}`} {...props}>
      {children}
      <NavLink to={to} className={styles.link}>
        {' '}
        {linkLabel}
      </NavLink>
    </p>
  );
}

AuthSwitcher.propTypes = {
  type: PropTypes.oneOf(['regular', 'integrated']),
};
