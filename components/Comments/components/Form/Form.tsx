import { Button, Textarea } from 'components';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'store';
import { useCreateCommentMutation } from 'store/apis';
import { closeCommentsSidebar } from 'store/states';
import { TSubmitFormEvent } from 'types';

import classes from './Form.module.scss';
import { IFormProps } from './Form.types';

export const Form: FC<IFormProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const {
    query: { id },
  } = useRouter();

  const submitHandler = async (event: TSubmitFormEvent): Promise<void> => {
    const text = event.text.trim();
    if (!text) {
      setValue('text', '');
      setError('text', { message: 'Bo`sh izoh' });
    }
    if (!id) return Promise.reject();
    await createComment({ text: event.text, articleId: +id });
    reset();
  };

  const closeComments = (): void => {
    dispatch(closeCommentsSidebar());
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      <Textarea
        placeholder='Izohingizni bu yerga yozing'
        color='transparent'
        {...register('text', { required: true, maxLength: 150 })}
      />
      {errors.text && (
        <div className='text-start text-danger'>{JSON.stringify(errors.text.message)}</div>
      )}
      <Button loading={isLoading} className='w-100 mx-auto mt-1' color='outline-dark'>
        Izoh qoldirish
      </Button>
      <Button type='button' className='w-100 mt-1' color='outline-dark' onClick={closeComments}>
        Yopish
      </Button>
    </form>
  );
};
