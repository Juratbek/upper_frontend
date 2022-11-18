import { VALIDITY_REQUIREMENTS } from './PasswordValidityLevel.constants';

export interface IPasswordValidityLevelProps {
  password: string;
}

export type TValidityRequirement = keyof typeof VALIDITY_REQUIREMENTS;
