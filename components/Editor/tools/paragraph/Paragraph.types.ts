import { BlockToolData } from '@editorjs/editorjs';

/**
 * Paragraph Tool's input and output data format
 */
export interface IParagraphData extends BlockToolData {
  text: string;
}

/**
 * Paragraph Tool's configuration object that passed through the initial Editor config
 */
export interface IParagraphConfig {}
