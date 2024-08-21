import { IconBold } from '@codexteam/icons';

export const InlineToolBold = {
  icon: IconBold,
  callback: () => {
    if (document.execCommand) {
      document.execCommand('bold');
    } else {
      console.error('document.execCommand is not executable');
    }
  },
};
