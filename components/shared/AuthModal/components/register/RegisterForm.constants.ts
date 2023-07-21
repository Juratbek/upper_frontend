import { TFormFields } from 'types';
import { validatePassword } from 'utils';

import { TField } from './RegisterForm.types';

const PROHIBITED_NAMES: Array<string> = ['upper', 'upper admin'];

// form fields for register form, it is used all over the project
export const REGISTER_FORM_FIELDS: TFormFields<TField> = {
  name: {
    name: 'name',
    options: {
      required: "Blog nomi bo'sh bo'lishi mumkin emas",
      maxLength: {
        value: 70,
        message: "Blog nomi o'ta uzun",
      },
      validate: (value) =>
        !PROHIBITED_NAMES.includes(value?.toLowerCase()) || 'Taqiqlangan blog nomi',
    },
  },
  email: {
    name: 'email',
    options: {
      maxLength: {
        value: 100,
        message: "Email o'ta uzun",
      },
    },
  },
  bio: {
    name: 'bio',
    options: {
      maxLength: {
        value: 80,
        message: "Bio o'ta uzun",
      },
    },
  },
  login: {
    name: 'login',
    options: {
      required: "Login bo'sh bo'lishi mumkin eams",
      minLength: {
        value: 8,
        message: "Login 8 harfdan kam bo'lmasligi kerak",
      },
      maxLength: {
        value: 60,
        message: "Login o'ta uzun",
      },
    },
  },
  password: {
    name: 'password',
    options: {
      required: "Parol bo'sh bo'lishi mumkin emas",
      minLength: {
        value: 8,
        message: "Parol 8 harfdan kam bo'lmasligi kerak",
      },
      maxLength: {
        value: 60,
        message: "Parol o'ta uzun",
      },
      validate: validatePassword,
    },
  },
  recaptcha: {
    name: 'recaptcha',
    options: {
      required: 'Bot emasligingizni tasdiqlash uchun bosing',
    },
  },
};
