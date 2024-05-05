import { AlertTypes } from './Alert.settings';

export type TAlertType = (typeof AlertTypes)[number];

export interface IAlertData {
  message: string;
  type: TAlertType;
}
