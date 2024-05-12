import { ChangeEvent, memo, useEffect, useRef } from 'react';
import { debouncer } from 'utils/debouncer';
import { ICONS } from 'variables/icons';

import { IToolProps } from '../tool.types';
import cls from './Quote.module.scss';
import { IQuoteData } from './Quote.types';

const QuoteUp = ICONS.quoteUp;
const QuoteDown = ICONS.quoteDown;

const debounce = debouncer<string>();

export const Quote = memo(
  function Memoized({ data, isEditable, api, id, type }: IToolProps<IQuoteData>) {
    const quoteRef = useRef<HTMLQuoteElement>(null);

    useEffect(() => {
      quoteRef.current?.focus();
    }, []);

    const quoteChangeHandler = (event: ChangeEvent<HTMLQuoteElement>) => {
      debounce(event.target.innerHTML, (value) =>
        api.setBlock<IQuoteData>({
          id,
          type,
          data: { alignment: data.alignment, caption: data.caption, text: value },
        }),
      );
    };

    const captionChangeHandler = (event: ChangeEvent<HTMLDivElement>) => {
      debounce(event.target.innerText, (value) =>
        api.setBlock<IQuoteData>({
          id,
          type,
          data: { alignment: data.alignment, caption: value, text: data.text },
        }),
      );
    };

    return (
      <figure>
        <div className={cls['quote-icon']}>
          <QuoteUp />
        </div>
        <blockquote
          onInput={quoteChangeHandler}
          ref={quoteRef}
          className={cls.blockquote}
          contentEditable={isEditable}
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
        <div className={`${cls['down']} ${cls['quote-icon']}`}>
          <QuoteDown />
        </div>
        {!Boolean(data.isCaptionHidden) && (
          <figcaption
            className={cls.author}
            onInput={captionChangeHandler}
            contentEditable={isEditable}
          >
            {data.caption}
          </figcaption>
        )}
      </figure>
    );
  },
  (prevProps, currentProps) => {
    const prevData = prevProps.data;
    const currentData = currentProps.data;

    if (
      prevData.alignment !== currentData.alignment ||
      prevData.isCaptionHidden !== currentData.isCaptionHidden
    )
      return false;

    return true;
  },
);
