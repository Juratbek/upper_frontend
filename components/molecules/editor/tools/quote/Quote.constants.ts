import { IconQuote } from '@codexteam/icons';

import { IBlockData } from '../../instance/Editor.types';
import { ITool } from '../tool.types';
import { QuoteSettings } from './Quote.settings';
import { Quote } from './Quote.tool';
import { IQuoteData } from './Quote.types';

export const QuoteTool: ITool = {
  toolbar: {
    text: 'Iqtibos',
    icon: IconQuote,
  },
  block: Quote,
  settings: QuoteSettings,
  tags: ['blockquote'],
  onPaste: (node) => {
    const quote = node as HTMLQuoteElement;
    return {
      text: quote.innerHTML,
      caption: '',
      isCaptionHidden: true,
    } satisfies IBlockData<IQuoteData>['data'];
  },
};
