import { Modal } from 'components';
import { Button, Lordicon, Spinner, Textarea } from 'components/lib';
import { useModal } from 'hooks';
import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ICreateFeedbackDto, useCreateFeedbackMutation } from 'store/apis';

import { StarMarker } from './components';
import classes from './FeedbackModal.module.scss';

const FEEDBACK = 'FEEDBACK';

export const FeedbackModal: FC = () => {
  const [mark, setMark] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, , { close, open }] = useModal();
  const { register, setFocus, handleSubmit, watch } = useForm();
  const [createFeedback, createFeedbackRes] = useCreateFeedbackMutation();

  const markChangeHandler = (mark: number): void => {
    setMark(mark);
    setTimeout(() => {
      nextHandler('text');
    }, 300);
  };

  const focus = (inputName: string): void => {
    setTimeout(() => {
      setFocus(inputName);
    }, 500);
  };
  const nextHandler = (inputName?: string): void => {
    inputName && focus(inputName);
    setCurrentStep((prev) => prev + 1);
  };

  const prevHandler = (inputName?: string): void => {
    inputName && focus(inputName);
    setCurrentStep((prev) => prev - 1);
  };

  const closeHandler = (): void => {
    close();
    // submitHandler({ text: watch('text'), suggestion: watch('suggestion') });
  };

  const submitHandler = async (event: Partial<ICreateFeedbackDto>): Promise<void> => {
    const { text, suggestion } = event;
    const feedback = { mark, text, suggestion };
    await createFeedback(feedback).unwrap();
    localStorage.setItem(FEEDBACK, JSON.stringify({ ...feedback, createdDate: new Date() }));
  };

  useEffect(() => {
    const feedback = localStorage.getItem(FEEDBACK);
    if (feedback) return;

    setTimeout(() => {
      open();
    }, 1000 * 60 * 2); // 2 minutes
  }, []);

  const markComponent = useMemo(() => {
    return (
      <div className='text-center pt-4'>
        <h2>Saytimizni baholang</h2>
        <StarMarker onChange={markChangeHandler} className='justify-content-center' />
      </div>
    );
  }, []);

  const feedbackTextComponent = useMemo(() => {
    return (
      <>
        <h2>
          {mark < 4
            ? 'Saytimizda qanday kamchiliklarni topdingiz'
            : 'Qaysi imkoniyatlar sizga yoqdi'}
        </h2>
        <Textarea {...register('text')} />
        <div className='d-flex f-gap-1 mt-1'>
          <Button type='button' onClick={(): void => prevHandler()} color='outline-dark'>
            Oldingi
          </Button>
          <Button type='button' onClick={(): void => nextHandler('suggestion')} className='flex-1'>
            Keyingi
          </Button>
        </div>
      </>
    );
  }, [mark]);

  const suggestionComponent = useMemo(() => {
    return (
      <>
        <h2>Qanday imkoniyatlar bo&apos;lishini hohlar edingiz</h2>
        <Textarea {...register('suggestion')} />
        <div className='d-flex f-gap-1 mt-1'>
          <Button type='button' onClick={(): void => prevHandler('text')} color='outline-dark'>
            Oldingi
          </Button>
          <Button className='flex-1'>Jo&apos;natish</Button>
        </div>
      </>
    );
  }, []);

  return (
    <Modal size='small' isOpen={isOpen || true} close={closeHandler}>
      {createFeedbackRes.isSuccess && (
        <div className='text-center'>
          <Lordicon
            className={classes.congrats}
            width={100}
            height={100}
            src='/icons/congrats.webp'
          />
          <h3>Fikringiz uchun rahmat :)</h3>
        </div>
      )}
      {createFeedbackRes.isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      {createFeedbackRes.isUninitialized && (
        <>
          <h2 className='my-1'>Sizning fikringiz biz uchun muhim</h2>
          <p className='m-0'>Saytimizni yahshilash uchun o&apos;z fikringizni bildiring</p>
          <div className={classes.slider}>
            <form
              className={classes.steps}
              onSubmit={handleSubmit(submitHandler)}
              style={{
                transform: `translateX(-${100 * currentStep}%)`,
              }}
            >
              <div className={classes.step}>{markComponent}</div>
              <div className={classes.step}>{feedbackTextComponent}</div>
              <div className={classes.step}>{suggestionComponent}</div>
            </form>
          </div>
          <div className='text-center mt-3'>{currentStep + 1} / 3</div>
        </>
      )}
    </Modal>
  );
};