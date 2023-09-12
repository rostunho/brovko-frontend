import { useState } from 'react';
import PropTypes from 'prop-types';
import AddingPlusIcon from '../../icons/AddingPlusIcon';
import SettingsWheelIcon from '../../icons/SettingsWheelIcon';
import GoBackIcon from 'shared/icons/GoBackIcon';
import DropdownArrowIcon from 'shared/icons/DropdownArrowIcon';
import CrossIcon from 'shared/icons/CrossIcon';
import MobileMenuIcon from 'shared/icons/MobileMenuIcon';
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
  icon,
  ...props
}) {
  const [clickOnSort, setClickOnSort] = useState(false);

  const onSortClick = () => {
    onClick && onClick();
    setClickOnSort(!clickOnSort);
  };

  return (
    <button
      type={type || 'button'}
      className={`${styles.button} ${styles[`button_${size}`]} ${
        styles[`button_${mode}`]
      } `}
      style={style}
      onClick={onSortClick}
      disabled={disabled}
      {...props}
    >
      {mode === 'adding' && <AddingPlusIcon small={size === 'sm'} />}
      {mode === 'settings' && <SettingsWheelIcon />}
      {mode === 'goBack' && <GoBackIcon />}
      {children}
      {mode === 'sort' && (
        <DropdownArrowIcon
          className={`${styles.icon} ${clickOnSort && styles['icon--reverse']}`}
        />
      )}
      {mode === 'close' && <CrossIcon large={size === 'lg'} />}
      {mode === 'menu' && <MobileMenuIcon />}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit']),
  mode: PropTypes.string,
  // mode: PropTypes.oneOf(['adding', 'settings', 'goBack', 'outlined']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func,
};
