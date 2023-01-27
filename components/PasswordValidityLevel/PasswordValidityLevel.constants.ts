import { TValidityRequirement } from './PasswordValidityLevel.types';

export const VALIDITY_REQUIREMENTS = {
  length: 'length',
  upperLowerCase: 'upperLowerCase',
  numberContains: 'numberContains',
};

export const PASSWORD_VALIDITY_REQUIREMENTS: Record<TValidityRequirement, string> = {
  length: "Parol 8 harfdan kam bo'lmasligi kerak",
  upperLowerCase: "Kamida bitta katta va kichik harf bo'lishi kerak",
  numberContains: "Kamida bitta raqam bo'lishi kerak",
};
