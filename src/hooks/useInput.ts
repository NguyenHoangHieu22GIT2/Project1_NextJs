import { useState } from 'react';

export function useInput(checkValue: (data: string) => boolean) {
  const [value, setValue] = useState<string>('');
  const [blur, setBlur] = useState<boolean>(false);

  const isValid = checkValue(value);
  const invalid = !checkValue(value) && blur;

  function changeValue(value: string) {
    setValue(value);
  }
  function changeBlur() {
    setBlur(true);
  }

  function reset() {
    setBlur(false);
    setValue('');
  }

  return {
    value,
    changeValue,
    changeBlur,
    reset,
    isValid,
    invalid,
    blur,
  };
}
