import { TFormFields } from 'types';

type TField = 'name' | 'bio' | 'login' | 'password';

export const REGISTER_FORM_FIELDS: TFormFields<TField> = {
  name: {
    name: 'name',
    options: {
      required: true,
      minLength: {
        value: 2,
        message: 'Blog nomi kamida 2 harfdan iborat bo`lishi zarur!',
      },
      maxLength: {
        value: 40,
        message: 'Blog nomi o`ta uzun',
      },
    },
  },
  bio: {
    name: 'name',
    options: {
      minLength: {
        value: 2,
        message: 'Bio kamida 2 harfdan iborat bo`lishi zarur!',
      },
      maxLength: {
        value: 50,
        message: 'Bio o`ta uzun',
      },
    },
  },
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
};
