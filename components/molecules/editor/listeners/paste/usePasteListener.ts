import { useCallback, useEffect } from 'react';
import { TArrayElement } from 'utils/typescript';

import { IEditorContext, TAddBlocks, useEditorContext } from '../../context';
import { getNodes } from '../../utils/html';
import janitor from '../../utils/janitor';

type TAddBlocksFirstParam = Parameters<TAddBlocks>[0];

export const usePasteListener = () => {
  const { addBlocks, toolsTagsMap, focusedBlock, tools } = useEditorContext();

  const pasteHandler = useCallback(
    (event: ClipboardEvent) => {
      event.stopPropagation();
      event.preventDefault();

      const { clipboardData } = event;
      // if clipboard is empty -> do nothing
      if (!clipboardData || !focusedBlock) return;

      const htmlData = clipboardData.getData('text/html');
      const htmlWithAllAllowedTags = janitor.clean(htmlData);

      // if html contains only inline text -> insert it into current block
      const htmlWithInlineTextTags = janitor.clean(htmlData, {
        onlyInlineTags: true,
      });
      if (htmlWithInlineTextTags === htmlWithAllAllowedTags) {
        document.execCommand('insertHtml', false, htmlWithInlineTextTags);
        return;
      }

      const nodes = getNodes(htmlWithAllAllowedTags);
      const blocks = generateBlocks(nodes, toolsTagsMap, tools);
      addBlocks(blocks, focusedBlock.id);
    },
    [addBlocks, toolsTagsMap, focusedBlock, tools],
  );

  useEffect(() => {
    document.addEventListener('paste', pasteHandler, true);

    return () => document.removeEventListener('paste', pasteHandler, true);
  }, [pasteHandler]);
};

function generateBlocks(
  nodes: Node[],
  toolsTagsMap: IEditorContext['toolsTagsMap'],
  tools: IEditorContext['tools'],
) {
  return nodes
    .map((node) => {
      const nodeName = node.nodeName.toLowerCase() as keyof HTMLElementTagNameMap;

      if (!Object.hasOwn(toolsTagsMap, nodeName)) return;

      const toolType = toolsTagsMap[nodeName];
      const tool = tools[toolType!];
      const data = tool.onPaste?.(node);

      if (!data) return;

      return {
        type: toolType!,
        data,
      } satisfies TArrayElement<TAddBlocksFirstParam>;
    })
    .filter((block) => block) as TAddBlocksFirstParam;
}
