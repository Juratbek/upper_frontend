import { CSSProperties, forwardRef } from 'react';
import { detectPlatform } from 'utils';

import { useEditorContext } from '../../context/useEditorContext';
import { TShortcut, TToolType } from '../../tools/tool.types';
import { Item, Popover } from '../popover/Popover';
import classes from './ToolsPopover.module.scss';

export const ToolsPopover = forwardRef<
  HTMLDivElement,
  { open: boolean; close: VoidFunction; style: CSSProperties }
>(function Component({ open, close, style }, ref) {
  const { tools, addBlock, hoveredBlock } = useEditorContext();

  const itemClickHandler = (type: TToolType) => {
    if (!hoveredBlock) {
      console.error("Tooltip shouldn't be shown if there is no hovered block");
      return;
    }
    addBlock(type, hoveredBlock.id);
    close();
  };

  const toolTypes = Object.keys(tools) as TToolType[];

  return (
    <Popover open={open} ref={ref} style={style}>
      <div className={classes.list}>
        {toolTypes.map((type) => {
          const { toolbar, shortcuts } = tools[type];
          if (!toolbar) return null;

          return (
            <Item
              onClick={() => itemClickHandler(type)}
              key={toolbar.text}
              icon={toolbar.icon}
              suffix={Array.isArray(shortcuts) ? shortcuts.map(getShortcutLabel).join(', ') : null}
            >
              {toolbar.text}
            </Item>
          );
        })}
      </div>
    </Popover>
  );
});

function getShortcutLabel(shortcut: TShortcut): string {
  let shortcutStr = shortcut;
  if (typeof shortcut === 'object') {
    shortcutStr = shortcut.key;
  }

  const platform = detectPlatform();
  if (platform === 'MacOS') return `CMD+${shortcutStr}`;
  if (platform === 'Linux' || platform === 'Windows') return `CTRL+${shortcutStr}`;

  return '';
}
