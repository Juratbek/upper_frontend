import { useCallback, useEffect } from 'react';

import { useEditorContext } from '../context';
import { Selection } from '../utils/selection';

export const useListeners = () => {
  const { showInlineToolbar, hideInlineToolbar } = useEditorContext();

  const selectionChangeHandler = useCallback(() => {
    const selection = Selection.selection;
    const blocksContainer = document.getElementById('editor-blocks');
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

    const editorContainer = document.querySelector('.editor-container');
    if (!editorContainer) {
      console.error("Editor container shouldn't be undefined");
      return;
    }

    const editorRect = editorContainer?.getBoundingClientRect();

    const top = selectedTextRect!.y - editorRect.y + selectedTextRect!.height + 8;

    showInlineToolbar({
      position: { top, left: selectedTextRect!.x - editorRect.x },
    });
  }, [showInlineToolbar, hideInlineToolbar]);

  useEffect(() => {
    document.addEventListener('selectionchange', selectionChangeHandler);

    return () => document.removeEventListener('selectionchange', selectionChangeHandler);
  }, []);
};
