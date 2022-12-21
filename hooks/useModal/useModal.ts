import { Dispatch, SetStateAction, useState } from 'react';

export const useModal = (
  defaultState = false,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [isOpen, setIsOpen] = useState(defaultState);

  const toggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  return [isOpen, toggle, setIsOpen];
};
