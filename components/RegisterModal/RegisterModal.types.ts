import { VALIDITY_REQUIREMENTS } from './RegisterModal.constants';

export type TField = 'name' | 'bio' | 'login' | 'password';

export interface IPasswordValidityLevelProps {
  password: string;
}

export type TValidityRequirement = keyof typeof VALIDITY_REQUIREMENTS;
