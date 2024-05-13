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
  tags: ['p', '#text', 'address'],
  onPaste: (node) => {
    let text;

    if (node.nodeName === '#text') {
      const textNode = node as Text;
      text = textNode.textContent;
    } else if (['ADDRESS', 'P'].includes(node.nodeName)) {
      const element = node as HTMLElement;
      text = element.innerHTML;
    }

    if (!text) return null;

    return { text } satisfies IBlockData<IParagraphData>['data'];
  },
};
