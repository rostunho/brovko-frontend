import { useState, useEffect } from 'react';
import PasswordToggler from 'shared/components/PasswordToggler/PasswordToggler';
import LinkIcon from 'shared/icons/LinkIcon';
import CalendarIcon from 'shared/icons/CalendarIcon';
import styles from './InputWithIcon.module.scss';

export default function InputWithIcon({ rootValueHandling, ...props }) {
  const { type, className, onChange } = props;
  const { valueRef, updateRootValue } = rootValueHandling;

  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    valueRef.current = localValue;
    updateRootValue();
  });

  const handleOnChange = event => {
    onChange && onChange();

    const { value } = event.target;
    setLocalValue(value);
  };

  const ActualInputIcon = () => {
    switch (type) {
      case 'password':
        return <PasswordToggler />;
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
        type={type === 'date' ? 'text' : type} // TO CHANGE
        data-type={type}
        className={className}
        onChange={handleOnChange}
      />
      <button type="button" className={styles['input-button']}>
        {ActualInputIcon()}
      </button>
    </>
  );
}
