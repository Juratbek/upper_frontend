import { HTMLAttributes } from 'react';

export interface IRecaptchaProps extends HTMLAttributes<HTMLDivElement> {
  siteKey: string;
  onSuccess?: (token: string) => void;
  onExpired?: () => void;
}
