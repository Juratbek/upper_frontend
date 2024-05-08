import { IconText } from '@codexteam/icons';

import { IBlockData } from '../../instance/Editor.types';
import { ITool } from '../tool.types';
import { Paragraph } from './Paragraph.tool';
import { IParagraphData } from './Paragraph.types';

export const ParagraphTool: ITool = {
  toolbar: {
    text: 'Matn',
    icon: IconText,
  },
  sanitize: (data: IBlockData['data']): IBlockData<IParagraphData>['data'] => {
    return { text: data.text };
  },
  block: Paragraph,
  inlineToolEnabled: true,
  tags: ['p'],
  onPaste: (node) => {
    const paragraph = node as HTMLParagraphElement;
    return { text: paragraph.innerHTML } satisfies IBlockData<IParagraphData>['data'];
  },
};
