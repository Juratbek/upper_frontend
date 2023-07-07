import { Button, Modal } from 'components';
import { FC, useState } from 'react';
import { IQuizSubmission, TQuizSubmissionColor } from 'store/apis';

import classes from './QuizResultModal.module.scss';

export const QuizResultModal: FC<{
  isOpen: boolean;
  isError: boolean;
  close: () => void;
  quizData: IQuizSubmission[];
}> = ({ isOpen, close, quizData, isError }) => {
  const [doesShowAnswers, setDoesShowAnswers] = useState(false);

  const getColor = (color: TQuizSubmissionColor): string => {
    // if test is passed successfully
    // if user wants to see the answers return color classname
    if (!isError || doesShowAnswers) return classes[color.toLowerCase()];

    if (color === 'RIGHT_ANSWER') return classes.normal;
    return classes[color.toLowerCase()];
  };

  const closeHandler = (): void => {
    close();
    setDoesShowAnswers(false);
  };

  return (
    <Modal isOpen={isOpen} close={closeHandler}>
      {quizData.map(({ text, value, color = 'NORMAL' }) => (
        <p key={value} className={`p-1 mb-1 mt-0 ${getColor(color)}`}>
          {text}
        </p>
      ))}
      {isError && (
        <div className='d-flex mt-2'>
          <div className='d-flex align-items-center me-3'>
            <span className={`${classes.success} ${classes.label}`} />- to&apos;g&apos;ri tanlangan
          </div>
          <div className='d-flex align-items-center me-3'>
            <span className={`${classes.error} ${classes.label}`} />- xato
          </div>
          <div className='d-flex align-items-center me-3'>
            <span className={`${classes['right_answer']} ${classes.label}`} />- to&apos;g&apos;ri
            javob
          </div>
        </div>
      )}
      {isError && !doesShowAnswers && (
        <div className='mt-2 d-flex f-gap-1'>
          <Button
            className='flex-1'
            color='outline-blue'
            onClick={(): void => setDoesShowAnswers(true)}
          >
            Javobni ko&apos;rish
          </Button>
        </div>
      )}
    </Modal>
  );
};
