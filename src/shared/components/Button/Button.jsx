import PropTypes from 'prop-types';
import PlusOfAdding from '../icons/PlusOfAdding';
import classes from './Button.module.scss';

export default function Button({
  children,
  type,
  onClick,
  mode = 'primary',
  size = 'md',
  style,
  ...props
}) {
  return (
    <button
      type={type || 'button'}
      className={`${classes.button} ${classes[`button_${mode}`]} ${
        classes[`button_${size}`]
      }`}
      style={style}
      onClick={onClick}
      disabled={mode === 'disabled'}
      {...props}
    >
      {mode === 'adding' && <PlusOfAdding className={classes.icon} />}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit']),
  mode: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func,
};
