import PropTypes from 'prop-types';
import classes from './Button.module.scss';

const Button = ({ children, type, onClick, mode, size, ...props }) => {
  return (
    <button
      type={type || 'button'}
      className={`${classes.button} ${classes[`button_${mode}`]} ${classes[`button_${size}`]}`}
      onClick={onClick}
      disabled={mode === 'disabled'}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit']),
  mode: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func,
};

export default Button;
