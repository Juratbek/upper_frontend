import { Error } from 'components/lib';
import { FC } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export const UsernameValidityError: FC<{
  value: string;
  show: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}> = ({ value, show = false, error }) => {
  if (!show) return null;

  if (value.startsWith('_'))
    return <Error show message='Login tag chiziq (_) bilan boshlanishi mumkin emas' />;

  if (value.endsWith('_'))
    return <Error show message='Login tag chiziq (_) bilan tugashi mumkin emas' />;

  if (error?.type === 'validate')
    return <Error show message='Lotin harflari, raqamlar va tag chiziq ishlatilishi mumkin' />;

  return <Error error={error} />;
};
