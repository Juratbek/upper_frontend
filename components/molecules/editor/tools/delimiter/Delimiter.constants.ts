import { IconDelimiter } from '@codexteam/icons';

import { IBlockData } from '../../instance/Editor.types';
import { ITool } from '../tool.types';
import { Delimiter } from './Delimiter.tools';

export const DelimiterTool: ITool = {
  toolbar: {
    text: 'Ajratuvchi',
    icon: IconDelimiter,
  },
  block: Delimiter,
  tags: ['div'],
  onPaste: (node) => {
    const div = node as HTMLDivElement;
    const role = div.getAttribute('role');

    if (role !== 'separator') return null;

    return {} satisfies IBlockData<unknown>['data'];
  },
};
