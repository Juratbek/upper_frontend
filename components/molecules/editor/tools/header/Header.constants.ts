import { IconHeading } from '@codexteam/icons';

import { IBlockData } from '../../instance/Editor.types';
import { ITool } from '../tool.types';
import { HeaderSettings } from './Header.settings';
import { Header } from './Header.tool';
import { IHeaderData } from './Header.types';

export const HeaderTool: ITool = {
  toolbar: {
    text: 'Sarlavha',
    icon: IconHeading,
  },
  settings: HeaderSettings,
  sanitize: (data: IBlockData['data']): IBlockData<IHeaderData>['data'] => {
    return { text: data.text, level: data.level, alignment: data.alignment };
  },
  block: Header,
  inlineToolEnabled: true,
  tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  onPaste: (node) => {
    const heading = node as HTMLHeadingElement;
    const level = heading.localName.at(-1);

    return {
      text: heading.innerHTML,
      level: Number(level) as IHeaderData['level'],
    } satisfies IBlockData<IHeaderData>['data'];
  },
};
