import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';

export interface ILanguage {
  label: string;
  extension: typeof javascript | typeof python;
}

export interface ICodeData {
  code: string;
  language: string;
}
