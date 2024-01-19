import { ApiError } from 'components';
import { Button, Link, StorysetImage } from 'components/lib';
import { FC } from 'react';
import { IResponseError } from 'types';
import { get } from 'utils';

export const ErrorUI: FC<{ error: IResponseError | null }> = ({ error }) => {
  if (error?.status === 500) return <ApiError className='container mt-2' error={error} />;
  if (error?.status === 404)
    return (
      <div className='text-center mt-3'>
        <StorysetImage width={400} height={400} src='/storyset/hidden.svg' storysetUri='data' />
        <h3>Maqola topilmadi</h3>
        <p className='text-gray'>Maqola o&apos;chirilgan yoki bloklangan bo&apos;lishi mumkin</p>
        <Link href='/'>
          <Button>Asosiy sahifaga qaytish</Button>
        </Link>
      </div>
    );
  return <h2>{get(error, 'data.message')}</h2>;
};
