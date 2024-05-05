import { IconBrackets } from '@codexteam/icons';

import { IInlineTool } from '../../inline-toolbar/InlineToolbar.types';
import { Selection } from '../../utils/selection';

export const InlineToolCode: IInlineTool = {
  icon: IconBrackets,
  callback: () => {
    const parentCodeTag = Selection.findParentTag('code');
    if (parentCodeTag) {
      unwrap(parentCodeTag);
      return;
    }

    const range = Selection.range;
    if (!range) return;
    wrap(range);
  },
};

function wrap(range: Range) {
  const code = document.createElement('code');

  code.appendChild(range.extractContents());
  range.insertNode(code);

  const selection = window.getSelection();
  selection?.removeAllRanges();
  const range1 = document.createRange();

  range1.selectNodeContents(code);
  selection?.addRange(range1);
}

function unwrap(codeElement: HTMLElement) {
  Selection.expandToTag(codeElement);

  const range = Selection.range;
  if (!range) return;

  const unwrappedContent = range.extractContents();

  /**
   * Remove empty term-tag
   */
  codeElement.parentNode?.removeChild(codeElement);

  /**
   * Insert extracted content
   */
  range.insertNode(unwrappedContent);

  /**
   * Restore selection
   */
  const sel = Selection.selection;
  sel?.removeAllRanges();
  sel?.addRange(range);
}
