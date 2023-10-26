// import { useState } from 'react';
// import styles from './SelectingInput.module.scss';

export default function SelectingInput({
  type,
  className,
  onChange,
  length,
  ...props
}) {
  const handleOnChange = event => {
    onChange && onChange(event);
  };

  return (
    <input
      {...props}
      type={type}
      data-type={type}
      className={`${className}`}
      onChange={handleOnChange}
      onClick={handleOnChange}
    />
  );
}
