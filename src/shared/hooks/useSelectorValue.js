import { useState } from 'react';

export function useSelectorValue(initialState) {
  const [selectorValue, setSelectorValue] = useState(initialState);

  const fetchSelectorValue = value => {
    setSelectorValue(value);
  };

  return [selectorValue, fetchSelectorValue];
}
