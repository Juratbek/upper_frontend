import { IconChevronDown, IconChevronUp, IconCross } from '@codexteam/icons';
import { useMemo } from 'react';

import { useEditorContext } from '../../context';
import { IToolbar } from '../../tools/tool.types';

export interface ISettingsBtn extends IToolbar {
  onClick: VoidFunction;
}

export const useSettings = (): ISettingsBtn[] => {
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
