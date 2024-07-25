import { python } from '@codemirror/lang-python';

export interface ILanguage {
  label: string;
  extension: typeof python;
}

export interface ICodeData {
  code: string;
  language: string;
}
