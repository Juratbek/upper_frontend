import { useCallback, useEffect, useMemo } from 'react';

import { useEditorContext } from '../../context';
import { IBlockData } from '../../instance/Editor.types';
import { TToolsMapper } from '../../tools/tool.types';

export const useShortcutsListener = () => {
  const { tools, addBlock, focusedBlock } = useEditorContext();

  const shortcuts = useMemo(() => {
    return Object.keys(tools).reduce<Record<string, Pick<IBlockData, 'type' | 'data'>>>(
      (res, toolType) => {
        const tool = tools[toolType as keyof TToolsMapper];
        const { shortcuts } = tool;
        if (!Array.isArray(shortcuts)) return res;

        shortcuts.forEach((shortcut) => {
          if (typeof shortcut === 'string') {
            res[shortcut] = { type: toolType as keyof TToolsMapper, data: tool.initialData ?? {} };
          } else if (typeof shortcut === 'object') {
            res[shortcut.key] = {
              type: toolType as keyof TToolsMapper,
              data: shortcut.data,
            };
          }
        });

        return res;
      },
      {},
    );
  }, [tools]);

  const keydownListener = useCallback(
    (event: KeyboardEvent) => {
      if (!event.metaKey) return;
      const { key } = event;

      if (!Object.hasOwn(shortcuts, key)) return;
      const shortcut = shortcuts[key];

      addBlock(shortcut.type, focusedBlock?.id, shortcut.data);

      event.preventDefault();
    },
    [shortcuts, addBlock, focusedBlock],
  );

  useEffect(() => {
    document.addEventListener('keydown', keydownListener);

    return () => document.removeEventListener('keydown', keydownListener);
  }, [keydownListener]);
};
