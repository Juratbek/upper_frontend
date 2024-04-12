import { IconChevronDown, IconChevronUp, IconCross } from '@codexteam/icons';
import { useMemo } from 'react';

import { useEditorContext } from '../../context';
import { IToolbarSetting } from '../../tools/tool.types';

export const useSettings = (): IToolbarSetting[] => {
  const { moveBlockUp, hoveredBlock, moveBlockDown, removeBlock } = useEditorContext();

  return useMemo(
    () => [
      {
        text: 'Yuqoriga surish',
        icon: IconChevronUp,
        onClick: () => moveBlockUp(hoveredBlock!.id),
      },
      {
        text: "O'chirish",
        icon: IconCross,
        onClick: () => removeBlock(hoveredBlock!.id),
      },
      {
        text: 'Pastga surish',
        icon: IconChevronDown,
        onClick: () => moveBlockDown(hoveredBlock!.id),
      },
    ],
    [hoveredBlock],
  );
};
