import { BlockToolData } from '@editorjs/editorjs';

/**
 * Alert Tool's type
 */
export type TAlertType = 'info';

/**
 * Alert Tool's input and output data format
 */
export interface IAlertData extends BlockToolData {
  message: string;
  type: TAlertType;
}

/**
 * Alert Tool's configuration object that passed through the initial Editor config
 */
export interface IAlertConfig {}
