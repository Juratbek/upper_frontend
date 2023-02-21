import { Button, Error, Textarea } from 'components';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'store';
import { useCreateCommentMutation } from 'store/apis';
import { closeCommentsSidebar } from 'store/states';
import { TSubmitFormEvent } from 'types';
import { addKeyboardListeners } from 'utils';

import classes from './Form.module.scss';
import { IFormProps } from './Form.types';

export const Form: FC<IFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const {
    query: { id },
  } = useRouter();

  const submitHandler = async (event: TSubmitFormEvent): Promise<void> => {
    if (!id) return Promise.reject();
    await createComment({ text: event.text.trim(), articleId: +id }).unwrap();
    reset();
    props.onSubmit?.();
  };

  const closeComments = (): void => {
    dispatch(closeCommentsSidebar());
  };

  const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = event.target.value;
    setValue('text', value);
    if (errors.text && value.trim()) {
      clearErrors('text');
    }
  };

  useEffect(() => {
    const listener = addKeyboardListeners(
      [
        { key: 'Enter', ctrlKey: true },
        { key: 'Enter', metaKey: true },
      ],
      () => {
        const text = (watch('text') as string)?.trim();
        if (text) {
          submitHandler({ text });
        } else {
          setError('text', { message: "Izoh bo'sh bo'lishi mumkin emas" }, { shouldFocus: true });
        }
      },
    );
    return listener.clear;
  }, []);

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      <Textarea
        placeholder='Izohingizni bu yerga yozing'
        color='transparent'
        {...register('text', {
          required: {
            value: true,
            message: "Izoh bo'sh bo'lishi mumkin emas",
          },
          maxLength: {
            value: 200,
            message: "Izoh uzunligi 200 belgidan ko'p bo'lmasigi kerak.",
          },
          validate: (value) => !!value.trim() || "Izoh bo'sh bo'lishi mumkin emas",
        })}
        onChange={onChangeComment}
      />
      <Error error={errors.text} />
      <Button loading={isLoading} className='w-100 mx-auto mt-1' color='outline-dark'>
        Izoh qoldirish
      </Button>
      <Button type='button' className='w-100 mt-1' color='outline-dark' onClick={closeComments}>
        Yopish
      </Button>
    </form>
  );
};
