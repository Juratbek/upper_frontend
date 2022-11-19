import { useState } from 'react';

export const useModal = (defaultState = false): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(defaultState);

  const toggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  return [isOpen, toggle];
};
