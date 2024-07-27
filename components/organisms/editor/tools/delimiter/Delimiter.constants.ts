import { IconDelimiter } from '@codexteam/icons';

import { IBlockData } from '../../instance/Editor.types';
import { ITool } from '../tool.types';
import { Delimiter } from './Delimiter.tool';

export const DelimiterTool: ITool = {
  toolbar: {
    text: 'Ajratuvchi',
    icon: IconDelimiter,
  },
  block: Delimiter,
  tags: ['div', 'hr'],
  shortcuts: ['/'],
  onPaste: (node) => {
    const element = node as HTMLElement;

    const role = element.getAttribute('role');
    // if element is a div but role is not 'separator' -> do not add a delimiter block
    if (element.nodeName === 'DIV' && role !== 'separator') {
      return null;
    }

    return {} satisfies IBlockData<unknown>['data'];
  },
};
