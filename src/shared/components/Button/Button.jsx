import PropTypes from 'prop-types';
import AddingPlusIcon from '../../icons/AddingPlusIcon';
import SettingsWheelIcon from '../../icons/SettingsWheelIcon';
import GoBackIcon from 'shared/icons/GoBackIcon';
import classes from './Button.module.scss';

export default function Button({
  children,
  type,
  onClick,
  mode = 'primary',
  size = 'md',
  style,
  disabled,
  ...props
}) {
  console.log(mode);

  return (
    <button
      type={type || 'button'}
      className={`${classes.button} ${classes[`button_${size}`]} ${
        classes[`button_${mode}`]
      } `}
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {mode === 'adding' && <AddingPlusIcon className={classes.icon} />}
      {mode === 'settings' && <SettingsWheelIcon className={classes.icon} />}
      {mode === 'goBack' && <GoBackIcon />}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit']),
  mode: PropTypes.string,
  // mode: PropTypes.oneOf(['adding', 'settings', 'goBack']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func,
};
