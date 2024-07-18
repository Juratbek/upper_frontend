import { IconItalic } from '@codexteam/icons';

import { IInlineTool } from '../../inline-toolbar/InlineToolbar.types';

export const InlineToolItalic: IInlineTool = {
  icon: IconItalic,
  callback: () => {
    document.execCommand('italic');
  },
};
