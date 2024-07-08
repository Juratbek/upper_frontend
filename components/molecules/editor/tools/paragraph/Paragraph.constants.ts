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
  addBlocksOnPaste: true,
  tags: ['p', '#text', 'address'],
  shortcuts: ['m'],
  onPaste: (node) => {
    let text;

    if (node.nodeName === '#text') {
      const textNode = node as Text;
      text = textNode.textContent;
    } else if (['ADDRESS', 'P'].includes(node.nodeName)) {
      const element = node as HTMLElement;

      // if the element has img children -> do not render a paragraph block, it will be handled by the image tool
      if (element.querySelector('img')) return null;

      text = element.innerHTML;
    }

    if (!text) return null;

    return { text } satisfies IBlockData<IParagraphData>['data'];
  },
};
