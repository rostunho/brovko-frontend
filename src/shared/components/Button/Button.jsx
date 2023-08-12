import PropTypes from 'prop-types';
import AddingPlusIcon from '../../icons/AddingPlusIcon';
import SettingsWheelIcon from '../../icons/SettingsWheelIcon';
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
      {mode === 'adding' && <AddingPlusIcon className={classes.icon} />}
      {mode === 'settings' && <SettingsWheelIcon className={classes.icon} />}
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
