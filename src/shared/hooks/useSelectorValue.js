import { useState } from 'react';

export function useSelectorValue() {
  const [selectorValue, setSelectorValue] = useState('');

  const fetchSelectorValue = value => {
    setSelectorValue(value);
  };

  return [selectorValue, fetchSelectorValue];
}
