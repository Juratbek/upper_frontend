import { TFormFields } from 'types';

type TField = 'login' | 'password' | 'recaptcha';

export const LOGIN_FORM_FIELDS: TFormFields<TField> = {
  login: {
    name: 'login',
    options: {
      required: true,
      minLength: {
        value: 8,
        message: 'Login 8 harfdan kam bo`lmasligi kerak',
      },
      maxLength: {
        value: 20,
        message: 'Login o`ta uzun',
      },
    },
  },
  password: {
    name: 'password',
    options: {
      required: true,
      minLength: {
        value: 8,
        message: 'Parol 8 harfdan kam bo`lmasligi kerak',
      },
      maxLength: {
        value: 30,
        message: 'Parol o`ta uzun',
      },
    },
  },
  recaptcha: {
    name: 'recaptcha',
    options: {
      required: true,
    },
  },
};
