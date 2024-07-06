import { useCallback, useEffect } from 'react';

import { useEditorContext } from '../../context';
import { getEditorBlocksContainer } from '../../utils';
import { Selection } from '../../utils/selection';

export const useSelectionListener = () => {
  const { showInlineToolbar, hideInlineToolbar, focusedBlock, tools, isEditable } =
    useEditorContext();

  const selectionChangeHandler = useCallback(() => {
    if (!focusedBlock) return;
    const isInlineToolbarEnabled = tools[focusedBlock.type].inlineToolEnabled;
    if (isInlineToolbarEnabled !== true) hideInlineToolbar();

    const selection = Selection.selection;
    const blocksContainer = getEditorBlocksContainer();
    if (!selection || !blocksContainer) return;

    const selectedText = Selection.text;
    const inlineToolbarContainer = document.getElementById('inline-toolbar');
    const isSelectionInsideBlocksContainer = blocksContainer.contains(selection.anchorNode);
    const isSelectionInsideInlineToolbarContainer = inlineToolbarContainer?.contains(
      selection.anchorNode,
    );

    if (!selectedText && !isSelectionInsideInlineToolbarContainer) {
      hideInlineToolbar();
    }

    // if there is no selected text or selected text is not inside blocks -> do nothing
    if (!selectedText || !isSelectionInsideBlocksContainer) return;

    const selectedTextRect = Selection.rect;

    const editorContainer = getEditorBlocksContainer();
    if (!editorContainer) {
      console.error("Editor container shouldn't be undefined");
      return;
    }

    const editorRect = editorContainer?.getBoundingClientRect();

    const top = selectedTextRect!.y - editorRect.y + selectedTextRect!.height + 32;

    showInlineToolbar({
      position: { top, left: selectedTextRect!.x - editorRect.x },
    });
  }, [showInlineToolbar, hideInlineToolbar, focusedBlock, tools]);

  useEffect(() => {
    if (!isEditable) return;

    document.addEventListener('selectionchange', selectionChangeHandler);

    return () => document.removeEventListener('selectionchange', selectionChangeHandler);
  }, [selectionChangeHandler, isEditable]);
};
