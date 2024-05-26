import { Button } from 'components/lib';
import { useRouter } from 'next/router';
import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import { IQuizSubmission, useSubmitQuiz } from 'store/clients/quiz';
import { IResponseError } from 'types';
import { getClassName } from 'utils';
import { debouncer } from 'utils/debouncer';

import { IToolProps } from '../tool.types';
import cls from './Quiz.module.scss';
import { IQuizData, IVariant } from './Quiz.types';

const debounce = debouncer<string>();

export const Quiz = memo(
  function Memoized({ data, isEditable, api, id, type }: IToolProps<IQuizData>) {
    const { variants, answers } = data;
    const questionParagraphRef = useRef<HTMLParagraphElement>(null);
    const [selectedVariants, setSelectedVariants] = useState<number[]>([]);
    const [submissionState, setSubmissionState] = useState<Record<number, IQuizSubmission>>({});
    const { query } = useRouter();

    const generateSubmissionState = (data: IQuizSubmission[]) => {
      return data.reduce<Record<number, IQuizSubmission>>((result, answer) => {
        result[answer.value] = answer;
        return result;
      }, {});
    };

    const submissionErrorHandler = (err: IResponseError<IQuizSubmission[]>) => {
      const data = err.data?.data;
      if (err.data?.code === 400 && Array.isArray(data)) {
        const submission = generateSubmissionState(data);
        setSubmissionState(submission);
      }
    };

    const submissionSuccessHandler = (data: IQuizSubmission[]) => {
      const submission = generateSubmissionState(data);
      setSubmissionState(submission);
    };

    const { mutate: submit, isPending } = useSubmitQuiz({
      onError: submissionErrorHandler,
      onSuccess: submissionSuccessHandler,
    });

    useEffect(() => {
      questionParagraphRef.current?.focus();
    }, []);

    const updateBlockData = (value: IVariant['value']) => {
      if (data.type === 'singleSelect') {
        api.setBlock({ id, type, data: { ...data, answers: [value] } });
        return;
      }

      const { answers } = data;
      if (answers.includes(value)) {
        const newAnswers = answers.filter((v) => v !== value);
        api.setBlock({ id, type, data: { ...data, answers: newAnswers } });
        return;
      }

      api.setBlock({ id, type, data: { ...data, answers: [...answers, value] } });
    };

    const updateSelectedVariants = (value: IVariant['value']) => {
      setSelectedVariants((variants) => {
        if (variants.includes(value)) return variants.filter((v) => v !== value);

        return [...variants, value];
      });
    };

    const inputChangeHandler = (value: IVariant['value']) => {
      if (isEditable) {
        updateBlockData(value);
      } else {
        updateSelectedVariants(value);
        setSubmissionState({});
      }
    };

    const itemTextChangeHandler = (index: number) => (event: ChangeEvent<HTMLDivElement>) => {
      debounce(event.target.innerHTML, (updatedText) => {
        const newVariants = [...data.variants];
        newVariants[index].text = updatedText;

        const newData: IQuizData = { ...data, variants: newVariants };
        api.setBlock<IQuizData>({ id, type, data: newData });
      });
    };

    const questionChangeHandler = (event: ChangeEvent<HTMLDivElement>) => {
      debounce(event.target.innerHTML, (updatedQuestion) => {
        api.setBlock<IQuizData>({ id, type, data: { ...data, question: updatedQuestion } });
      });
    };

    const submitHandler = () => {
      if (!query.id || isNaN(+query.id)) return;
      submit({ articleId: +query.id, id, selectedVariants: selectedVariants });
    };

    return (
      <div className={cls.container}>
        <p
          ref={questionParagraphRef}
          className={cls.title}
          contentEditable={isEditable}
          dangerouslySetInnerHTML={{ __html: data.question ?? '' }}
          onInput={questionChangeHandler}
        />
        <ul className={cls.list}>
          {Array.isArray(variants) &&
            variants.map((variant, index) => {
              const submission = submissionState[variant.value];

              return (
                <li
                  className={getClassName(
                    cls.option,
                    submission !== undefined && cls[submission.color],
                  )}
                  key={variant.value}
                >
                  <div className={cls['input-container']}>
                    <input
                      type={data.type === 'singleSelect' ? 'radio' : 'checkbox'}
                      checked={
                        isEditable
                          ? answers.includes(variant.value)
                          : selectedVariants.includes(variant.value)
                      }
                      onChange={() => inputChangeHandler(variant.value)}
                    />
                  </div>
                  <div
                    className={cls.text}
                    dangerouslySetInnerHTML={{ __html: variant.text ?? '' }}
                    contentEditable={isEditable}
                    onInput={itemTextChangeHandler(index)}
                  />
                </li>
              );
            })}
        </ul>
        {selectedVariants.length > 0 && !isEditable && (
          <Button loading={isPending} onClick={submitHandler} className={cls['submit-btn']}>
            Tekshirish
          </Button>
        )}
      </div>
    );
  },
  (prevProps, currentProps) => {
    const prevData = prevProps.data;
    const currentData = currentProps.data;

    // if type, answers or variants has been changed -> update
    if (
      prevData.type !== currentData.type ||
      prevData.answers !== currentData.answers ||
      prevData.variants.length !== currentData.variants.length
    )
      return false;

    return true;
  },
);
