import { useState } from 'react';
import PasswordToggler from 'shared/components/PasswordToggler/PasswordToggler';
import LinkIcon from 'shared/icons/LinkIcon';
import CalendarIcon from 'shared/icons/CalendarIcon';
import SearchIcon from 'shared/icons/SearchIcon';
import styles from './InputWithIcon.module.scss';

export default function InputWithIcon({
  type,
  className,
  onChange,
  onFocus,
  onClick,
  length,
  icon,
  link,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = event => {
    onChange && onChange(event);
  };

  const handleOnClick = event => {
    onClick && onClick(event);

    // setButtonInFocus(true);
    type === 'password' && toggleOnIconClick(event);
  };

  const toggleOnIconClick = event => {
    setShowPassword(!showPassword);
  };

  const handleType = () => {
    if (type === 'password' && !showPassword) {
      return 'password';
    }

    if (type === 'password' && showPassword) {
      return 'text';
    }

    // DELETE FROM HERE
    if (type === 'date') {
      return 'text';
    }

    return type; // for type="url"
  };

  const handleInputIcon = () => {
    switch (type) {
      case 'password':
        return <PasswordToggler {...props} />;
      case 'url':
        return <LinkIcon />;
      case 'date':
        return <CalendarIcon />;
      case 'search':
        return <SearchIcon />;
      default:
        return null;
    }
  };

  return (
    <>
      <input
        {...props}
        type={handleType()} // TO CHANGE INTO handleType
        data-type={type}
        className={className}
        onChange={handleOnChange}
        // onClick={onClick}
      />

      <button
        tabIndex="-1"
        type="button"
        className={`${styles['input-button']} ${
          !props?.label ? styles['input-without-label'] : ''
        }`}
        onClick={handleOnClick}
        onFocus={onFocus}
      >
        {handleInputIcon()}
      </button>
    </>
  );
}
