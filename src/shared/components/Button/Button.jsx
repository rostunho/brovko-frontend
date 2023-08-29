import PropTypes from 'prop-types';
import AddingPlusIcon from '../../icons/AddingPlusIcon';
import SettingsWheelIcon from '../../icons/SettingsWheelIcon';
import GoBackIcon from 'shared/icons/GoBackIcon';
import styles from './Button.module.scss';

export default function Button({
  children,
  type,
  onClick,
  mode = 'primary',
  size = 'md',
  small,
  style,
  disabled,
  ...props
}) {
  return (
    <button
      type={type || 'button'}
      className={`${styles.button} ${styles[`button_${size}`]} ${
        styles[`button_${mode}`]
      } `}
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {mode === 'adding' && <AddingPlusIcon small={size === 'sm'} />}
      {mode === 'settings' && <SettingsWheelIcon />}
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
