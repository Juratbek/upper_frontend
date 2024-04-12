import { FC } from 'react';

import { IToolProps } from '../tool.types';
import { IQuoteData } from './Quote.types';

export const Quote: FC<IToolProps<IQuoteData>> = ({ data }) => {
  return <blockquote>{data.text}</blockquote>;
};
