import { FC } from 'react';

import { useEditorContext } from '../../context/useEditorContext';
import { TToolType } from '../../tools/tool.types';
import { Item, Popover } from '../popover/Popover';
import classes from './ToolsPopover.module.scss';

export const ToolsPopover: FC<{ open: boolean; close: VoidFunction }> = ({ open, close }) => {
  const { tools, addBlock, hoveredBlock } = useEditorContext();

  const itemClickHandler = (type: TToolType) => {
    if (!hoveredBlock) {
      console.error("Tooltip shouldn't be shown if there is no hovered block");
      return;
    }
    addBlock(type, hoveredBlock);
    close();
  };

  const toolTypes = Object.keys(tools) as TToolType[];

  return (
    <Popover open={open}>
      <div className={classes.list}>
        {toolTypes.map((type) => {
          const { toolbar } = tools[type];
          return (
            <Item onClick={() => itemClickHandler(type)} key={toolbar.text} icon={toolbar.icon}>
              {toolbar.text}
            </Item>
          );
        })}
      </div>
    </Popover>
  );
};
