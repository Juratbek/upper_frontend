import { Dispatch, SetStateAction, useState } from 'react';

export const useModal = (
  defaultState = false,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>, () => void] => {
  const [isOpen, setIsOpen] = useState(defaultState);

  const toggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  const close = (): void => {
    setIsOpen(false);
  };

  return [isOpen, toggle, setIsOpen, close];
};
