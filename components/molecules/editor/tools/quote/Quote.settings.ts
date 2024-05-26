import { IconUser } from '@codexteam/icons';

import { IToolbarSetting } from '../tool.types';
import { getCurrentBlock } from '../utils';
import { IQuoteData } from './Quote.types';

export const QuoteSettings: IToolbarSetting[] = [
  {
    icon: IconUser,
    text: 'Aftorsiz iqtibos',
    active: (context) => getCurrentBlock<IQuoteData>(context)?.data.isCaptionHidden ?? false,
    onClick: (context) => {
      const block = getCurrentBlock<IQuoteData>(context);
      if (!block) return;
      const isCaptionHidden = block.data.isCaptionHidden ?? false;

      context.setBlock({
        data: { ...block.data, isCaptionHidden: !isCaptionHidden },
        id: block.id,
        type: block.type,
      });
    },
  },
];
