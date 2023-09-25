import { useState, useEffect } from 'react';
import PasswordToggler from 'shared/components/PasswordToggler/PasswordToggler';
import LinkIcon from 'shared/icons/LinkIcon';
import CalendarIcon from 'shared/icons/CalendarIcon';
import styles from './InputWithIcon.module.scss';

export default function InputWithIcon({ rootStateHandling, ...props }) {
  const { type, className, onChange, onFocus, onClick } = props;
  const { valueRef, updateRootValue } = rootStateHandling;

  const [localValue, setLocalValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    valueRef.current = localValue;
    updateRootValue();
  });

  const handleOnChange = event => {
    onChange && onChange(event);

    const { value } = event.target;
    setLocalValue(value);
  };

  const handleOnClick = event => {
    onClick && onClick(event);

    // setButtonInFocus(true);
    toggleOnIconClick(event);
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
        className={styles['input-button']}
        onClick={handleOnClick}
        onFocus={onFocus}
      >
        {handleInputIcon()}
      </button>
    </>
  );
}
