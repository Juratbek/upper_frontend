import { FC, useEffect, useRef } from 'react';
import { ICONS } from 'variables/icons';

import { IToolProps } from '../tool.types';
import cls from './Quote.module.scss';
import { IQuoteData } from './Quote.types';

const QuoteUp = ICONS.quoteUp;
const QuoteDown = ICONS.quoteDown;

export const Quote: FC<IToolProps<IQuoteData>> = ({ data, isEditable }) => {
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    quoteRef.current?.focus();
  }, []);

  return (
    <div>
      <QuoteUp />
      <blockquote ref={quoteRef} className={cls.blockquote} contentEditable={isEditable}>
        {data.text}
      </blockquote>
      <div className={cls['quote-down']}>
        <QuoteDown />
      </div>
      <div className={cls.author} contentEditable={isEditable}>
        {data.caption}
      </div>
    </div>
  );
};
