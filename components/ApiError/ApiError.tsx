import { Alert } from 'components';
import { FC } from 'react';
import { TELEGRAM_BOT } from 'variables';

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
