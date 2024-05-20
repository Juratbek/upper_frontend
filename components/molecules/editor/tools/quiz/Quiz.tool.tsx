import { ChangeEvent, memo, useEffect, useRef } from 'react';
import { debouncer } from 'utils/debouncer';

import { IToolProps } from '../tool.types';
import cls from './Quiz.module.scss';
import { IQuizData, IVariant } from './Quiz.types';

const debounce = debouncer<string>();

export const Quiz = memo(
  function Memoized({ data, isEditable, api, id, type }: IToolProps<IQuizData>) {
    const { variants, answers } = data;
    const questionParagraphRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
      questionParagraphRef.current?.focus();
    }, []);

    const inputChangeHandler = (value: IVariant['value']) => {
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
            variants.map((variant, index) => (
              <li className={cls.option} key={variant.value}>
                <div className={cls['input-container']}>
                  <input
                    type={data.type === 'singleSelect' ? 'radio' : 'checkbox'}
                    checked={answers.includes(variant.value)}
                    // onClick={() => console.log('click')}
                    onChange={() => inputChangeHandler(variant.value)}
                    // onSelect={() => console.log('select')}
                    // onChange={() => console.log('change')}
                  />
                </div>
                <div
                  className={cls.text}
                  dangerouslySetInnerHTML={{ __html: variant.text ?? '' }}
                  contentEditable={isEditable}
                  onInput={itemTextChangeHandler(index)}
                />
              </li>
            ))}
        </ul>
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
