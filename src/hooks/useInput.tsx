import { useState } from 'react';

export default function useInput(initialState = '') {
  const [value, setValue] = useState(initialState);

  function onChange(event: any) {
    setValue(event.target.value);
  }

  return { value, onChange, setValue };
}