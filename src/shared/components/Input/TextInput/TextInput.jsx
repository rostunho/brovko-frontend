import { useState, useEffect } from 'react';

export default function TextInput({ rootStateHandling, ...props }) {
  const { type, onChange } = props;
  const { valueRef, updateRootValue } = rootStateHandling;
  const [localValue, setLocalValue] = useState('');

  console.log('TEXT-INPUT RERENDERING');

  useEffect(() => {
    valueRef.current = localValue;
    updateRootValue();
  }, [localValue, updateRootValue, valueRef]);

  const handleOnChange = event => {
    onChange && onChange(event);
    const { value } = event.target;
    setLocalValue(value);
  };

  return (
    <input
      {...props}
      onChange={handleOnChange}
      inputMode="text"
      data-type={type}
    />
  );
}
