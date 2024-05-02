import { IconLink } from '@codexteam/icons';
import { KeyboardEvent } from 'react';

import { IInlineTool } from '../../inline-toolbar/InlineToolbar.types';
import { Selection } from '../../utils/selection';
import cls from './InlineToolLink.module.scss';

let range: Range | undefined;

export const InlineToolLink: IInlineTool = {
  icon: IconLink,
  callback: () => {
    range = Selection.range;
  },
  renderPopover: ({ close }) => {
    return (
      <input
        placeholder='Havolani kiriting'
        autoFocus
        className={cls.input}
        onKeyDown={(event) => keydownHandler(event, close)}
      />
    );
  },
};

function keydownHandler(event: KeyboardEvent<HTMLInputElement>, close: VoidFunction) {
  const { key } = event;
  let value = event.currentTarget.value || '';

  if (key === 'Enter' && value.trim()) {
    const selection = window.getSelection();
    if (!selection || !range) return;

    selection?.removeAllRanges();

    selection?.addRange(range);

    value = prepareLink(value);
    document.execCommand('createLink', false, value);

    close();
    event.preventDefault();
    event.stopPropagation();
  }
}

function prepareLink(link: string) {
  if (link.startsWith('http://' || link.startsWith('https://'))) return link;
  return `https://${link}`;
}
