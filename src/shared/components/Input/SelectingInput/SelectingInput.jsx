import { useState } from 'react';
import styles from './SelectingInput.module.scss';

export default function SelectingInput({ rootStateHandling, ...props }) {
  const { type, className } = props;
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);

  return (
    <input
      {...props}
      type={type}
      className={`${className} ${
        checkboxIsChecked ? styles['checkbox--checked'] : ''
      } `}
    ></input>
  );
}
