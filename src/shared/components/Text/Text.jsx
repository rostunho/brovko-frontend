import PropTypes from 'prop-types';
import styles from './Text.module.scss';

export default function Text({ type = 'regular', children, ...props }) {
  return (
    <p className={`${styles.text} ${styles[`text--${type}`]}`} {...props}>
      {children}
    </p>
  );
}

Text.propTypes = {
  type: PropTypes.oneOf(['regular', 'centered', 'divider', 'error']),
};
