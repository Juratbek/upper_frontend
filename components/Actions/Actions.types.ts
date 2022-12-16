import { ReactNode } from 'react';

interface IAction {
  label: ReactNode;
}

export interface IActinosProps {
  actions: IAction[];
}
