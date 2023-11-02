import PropTypes from 'prop-types';
import DropdownToggler from '../DropdownToggler/DropdownToggler';
import AddingPlusIcon from '../../icons/AddingPlusIcon';
import SettingsWheelIcon from '../../icons/SettingsWheelIcon';
import GoBackIcon from 'shared/icons/GoBackIcon';
import CrossIcon from 'shared/icons/CrossIcon';
import MobileMenuIcon from 'shared/icons/MobileMenuIcon';
import styles from './Button.module.scss';

export default function Button({
  children,
  className,
  type,
  onClick,
  mode = 'primary',
  size = 'md',
  small,
  style,
  disabled,
  icon,
  ...props
}) {
  return (
    <button
      type={type || 'button'}
      className={`${styles.button} ${styles[`button_${size}`]} ${
        styles[`button_${mode}`]
      } ${className ? className : ''}`}
      style={{ ...style }}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {mode === 'adding' && <AddingPlusIcon small={size === 'sm'} />}
      {mode === 'settings' && <SettingsWheelIcon />}
      {mode === 'goBack' && <GoBackIcon />}
      {children}
      {mode === 'sort' && <DropdownToggler className={styles.icon} />}
      {mode === 'close' && <CrossIcon large={size === 'lg'} />}
      {mode === 'menu' && <MobileMenuIcon />}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit']),
  mode: PropTypes.string,
  // mode: PropTypes.oneOf(['adding', 'settings', 'goBack', 'outlined', 'sort', 'close', 'menu']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'settings']),
  onClick: PropTypes.func,
};
