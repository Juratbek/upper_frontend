import { TAction } from 'types';

interface IAction {
  Icon?: () => JSX.Element;
  label: string;
}
export interface IActions {
  [string: TAction]: IAction;
}
export interface IActinosProps {
  actions: TAction[];
}
