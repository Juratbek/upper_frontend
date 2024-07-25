import { Alert } from 'components/lib';
import { TELEGRAM_BOT } from 'constants/common';
import { FC } from 'react';

import { IApiErrorProps } from './ApiError.types';

export const ApiError: FC<IApiErrorProps> = ({ error, className }) => {
  return (
    <Alert className={className}>
      <>
        Xatolik yuz berdi. Iltimos bu haqda{' '}
        <a href={TELEGRAM_BOT.link} className='link'>
          {TELEGRAM_BOT.name}
        </a>{' '}
        telegram botiga habar bering
        {error && <p>Xatolik: {JSON.stringify(error)}</p>}
      </>
    </Alert>
  );
};
