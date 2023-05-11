import { Button, Error, Textarea } from 'components';
import { useDevice } from 'hooks';
import { useRouter } from 'next/router';
import { FC, FormEvent, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateCommentMutation, useEditCommentMutation } from 'store/apis';
import { TSubmitFormEvent } from 'types';
import { addKeyboardListeners } from 'utils';
import { ICONS } from 'variables';

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
    setFocus,
    formState: { errors },
  } = useForm();
  const [createComment, createCommentRes] = useCreateCommentMutation();
  const [editComment, editCommentRes] = useEditCommentMutation();
  const isLoading = createCommentRes.isLoading || editCommentRes.isLoading;
  const { isMobile } = useDevice();
  const {
    query: { id },
  } = useRouter();

  const submitHandler = useCallback(
    async (event: TSubmitFormEvent): Promise<void> => {
      if (!id) return Promise.reject();
      const text = event.text.trim();

      if (props.isBeingEdited && props.selectedComment) {
        const comment = await editComment({ ...props.selectedComment, text }).unwrap();
        props.api.updateItem(comment);
      } else {
        await createComment({ text, articleId: +id }).unwrap();
      }

      reset();
      props.onSubmit?.(event);
    },
    [props.isBeingEdited, props.selectedComment, props.api],
  );

  const onChangeComment = (event: FormEvent<HTMLTextAreaElement>): void => {
    const value = event.currentTarget.value;
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
  }, [submitHandler]);

  useEffect(() => {
    const { selectedComment } = props;
    if (selectedComment) {
      const text = selectedComment.updatedText || selectedComment.text;
      setValue('text', text);
      if (!isMobile) setFocus('text');
    }
  }, [props.selectedComment, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const timeout = setTimeout(() => {
      setFocus('text');
    }, 100);
    return () => clearTimeout(timeout);
  }, [isMobile]);

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      {isMobile ? (
        <div className='d-flex align-items-center'>
          <div className='flex-1'>
            <Textarea
              rows={2}
              placeholder='Izohingizni bu yerga yozing'
              color={isMobile ? 'dark' : 'transparent'}
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
          </div>
          <span className='p-1'>
            <ICONS.send />
          </span>
        </div>
      ) : (
        <>
          <Textarea
            placeholder='Izohingizni bu yerga yozing'
            color={isMobile ? 'dark' : 'transparent'}
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
        </>
      )}
    </form>
  );
};
