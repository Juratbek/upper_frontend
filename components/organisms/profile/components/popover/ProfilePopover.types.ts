import { FC } from 'react';
import { TNoop } from 'types';

export interface ISubmenuProps {
  className?: string;
  onBack: TNoop;
}

export interface ISubmenuState {
  Component: FC<ISubmenuProps>;
  isShown: boolean;
}
