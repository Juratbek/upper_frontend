import { Button, Textarea } from 'components';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateCommentMutation } from 'store/apis';
import { TSubmitFormEvent } from 'types';

import classes from './Form.module.scss';
import { IFormProps } from './Form.types';

export const Form: FC<IFormProps> = () => {
  const { register, handleSubmit, reset } = useForm();
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const {
    query: { id },
  } = useRouter();

  const submitHandler = async (event: TSubmitFormEvent): Promise<void> => {
    if (!id) return Promise.reject();
    await createComment({ text: event.text, articleId: +id });
    reset();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      <Textarea
        placeholder='Izohingizni bu yerga yozing'
        color='transparent'
        {...register('text', { required: true, maxLength: 150 })}
      />
      <Button loading={isLoading} className='w-100 mx-auto' color='outline-dark'>
        Izoh qoldirish
      </Button>
    </form>
  );
};
