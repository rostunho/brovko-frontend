import { useState } from 'react';
import styles from './SelectingInput.module.scss';

export default function SelectingInput({ rootStateHandling, ...props }) {
  const { type, className, value, onChange } = props;
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const [localValue, setLocalValue] = useState('test');

  const handleOnChange = event => {
    onChange && onChange(event);
    setLocalValue(event.target.value);
  };

  return (
    <input
      {...props}
      type={type}
      data-type={type}
      className={`${className} ${
        checkboxIsChecked ? styles['checkbox--checked'] : ''
      } `}
      onChange={handleOnChange}
      onClick={handleOnChange}
    />
  );
}
