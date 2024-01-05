import { BlockToolData } from '@editorjs/editorjs';

import { AlertTypes } from './Alert.constants';

/**
 * Alert Tool's type
 */
export type TAlertType = (typeof AlertTypes)[number];

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
