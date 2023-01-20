import { useState } from 'react';

import { TVoidFn } from './useModal.types';

export const useModal = (
  defaultState = false,
): [boolean, () => void, { open: TVoidFn; close: TVoidFn }] => {
  const [isOpen, setIsOpen] = useState(defaultState);

  const toggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  const open = (): void => setIsOpen(true);

  const close = (): void => setIsOpen(false);

  return [isOpen, toggle, { open, close }];
};
