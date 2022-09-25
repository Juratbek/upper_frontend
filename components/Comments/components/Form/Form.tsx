import { Button, Textarea } from 'components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import classes from './Form.module.scss';
import { IFormProps } from './Form.types';

export const Form: FC<IFormProps> = () => {
  const { register } = useForm();

  return (
    <form className={classes.form}>
      <Textarea
        placeholder='Izohingizni bu yerga yozing'
        color='transparent'
        {...register('message', { required: true, maxLength: 150 })}
      />
      <Button className='w-100 mx-auto' color='outline-dark'>
        Izoh qoldirish
      </Button>
    </form>
  );
};
