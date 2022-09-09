import { RegisterOptions } from 'react-hook-form';

export interface IFormField {
  name: string;
  options?: RegisterOptions;
}

export type TFormFields<TName extends string> = {
  [name in TName]: IFormField;
};

export type TSubmitFormEvent = Record<string, string>;
