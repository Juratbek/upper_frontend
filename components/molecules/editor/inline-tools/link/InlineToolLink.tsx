import { IconLink } from '@codexteam/icons';
import { KeyboardEvent } from 'react';

import { IInlineTool, IPopoverCallbacks } from '../../inline-toolbar/InlineToolbar.types';
import { Selection } from '../../utils/selection';
import cls from './InlineToolLink.module.scss';

let range: Range | undefined;
let link: string | undefined = '';

export const InlineToolLink: IInlineTool = {
  icon: IconLink,
  callback: () => {
    range = Selection.range;
    const parentLinkTag = Selection.findParentTag('a') as HTMLAnchorElement;
    link = parentLinkTag?.href;
  },
  renderPopover: (callbacks) => {
    return (
      <input
        placeholder='Havolani kiriting'
        autoFocus
        className={cls.input}
        defaultValue={link}
        onKeyDown={(event) => keydownHandler(event, callbacks)}
      />
    );
  },
};

function keydownHandler(event: KeyboardEvent<HTMLInputElement>, callbacks: IPopoverCallbacks) {
  const { key } = event;
  const value = event.currentTarget.value || '';

  if (key === 'Enter') {
    const selection = window.getSelection();
    if (!selection || !range) return;

    // if input value is only spaces -> do nothing
    const isEmptySpace = value !== '' && value.trim() === '';
    if (isEmptySpace) return;

    // if input is empty -> remove link
    if (!value) {
      removeLink(selection, range);
    } else {
      wrapWithLink(selection, range, value);
    }

    event.preventDefault();
    callbacks.close();
  }
}

function wrapWithLink(selection: globalThis.Selection, range: Range, value: string) {
  selection.removeAllRanges();
  selection.addRange(range);

  const link = prepareLink(value);
  document.execCommand('createLink', false, link);
}

function prepareLink(link: string) {
  if (link.startsWith('http://' || link.startsWith('https://'))) return link;
  return `https://${link}`;
}

function removeLink(selection: globalThis.Selection, range: Range) {
  selection.removeAllRanges();
  selection.addRange(range);

  document.execCommand('unlink');
}
